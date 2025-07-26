import React, { useState, useEffect } from 'react';
import ComponentPalette from './components/ComponentPalette';
import Canvas from './editor/Canvas';
import PropertyPanel from './components/PropertyPanel';
import ComponentTree from './components/ComponentTree';
import Toolbar from './components/Toolbar';

type Resolution = { label: string; width: number; height: number };

const resolutions: Resolution[] = [
  { label: '240x240', width: 240, height: 240 },
  { label: '390x390', width: 390, height: 390 },
  { label: '454x454', width: 454, height: 454 },
  { label: '自定义', width: 320, height: 320 }
];

import { getVSCodeApi } from './utils/vscodeApi';

// 获取 VSCode API
const vscode = getVSCodeApi();

const App: React.FC = () => {
  const [resolution, setResolution] = useState<Resolution | null>(() => {
    // 从 VSCode 状态中恢复分辨率设置
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.resolution || null;
    }
    return null;
  });
  
  const [selectLabel, setSelectLabel] = useState(resolutions[0].label);
  const [custom, setCustom] = useState({ width: 320, height: 320 });
  const [projectName, setProjectName] = useState(() => {
    // 从 VSCode 状态中恢复项目名称
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.projectName || '';
    }
    return '';
  });
  const [projectDir, setProjectDir] = useState(() => {
    // 从 VSCode 状态中恢复项目目录
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.projectDir || '';
    }
    return '';
  });

  // 新增状态管理
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [components, setComponents] = useState<any[]>([]);
  
  // 左侧面板宽度状态
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    // 从 VSCode 状态中恢复左侧面板宽度
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.leftPanelWidth || 200; // 从280减少到200
    }
    return 200; // 从280减少到200
  });
  
  // 组件树高度状态
  const [componentTreeHeight, setComponentTreeHeight] = useState(() => {
    // 从 VSCode 状态中恢复组件树高度
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.componentTreeHeight || 200;
    }
    return 200;
  });
  
  // 拖拽调整宽度状态
  const [isResizing, setIsResizing] = useState(false);
  
  // 拖拽调整组件树高度状态
  const [isResizingTree, setIsResizingTree] = useState(false);

  // 保存状态到 VSCode
  const saveState = (newState: any) => {
    const vscode = getVSCodeApi();
    if (vscode) {
      const currentState = vscode.getState() || {};
      vscode.setState({ ...currentState, ...newState });
    }
  };

  // 初始化项目名称和目录
  useEffect(() => {
    // 从 VSCode 插件获取工作目录
    const currentDir = (window as any).vscodeWorkspacePath || '/';
    if (!projectDir) {
      setProjectDir(currentDir);
    }

    // 检查项目名称是否存在，自动递增
    const checkProjectName = async () => {
      if (!projectName) {
        let name = 'project1';
        let counter = 1;
        
        while (true) {
          try {
            // 这里可以添加检查逻辑，暂时用简单的递增
            const testName = `project${counter}`;
            // 实际项目中可以检查文件夹是否存在
            // const exists = await fs.existsSync(path.join(currentDir, testName));
            // if (!exists) {
            //   name = testName;
            //   break;
            // }
            name = testName;
            break; // 暂时直接使用，后续可以添加真实检查
          } catch (error) {
            counter++;
          }
        }
        
        setProjectName(name);
      }
    };

    checkProjectName();

    // 监听来自插件的消息
    if (vscode) {
      const handleMessage = (event: MessageEvent) => {
        const message = event.data;
        switch (message.command) {
          case 'directorySelected':
            setProjectDir(message.path);
            break;
          case 'projectFolderCreated':
            if (message.success) {
              console.log('项目文件夹创建成功:', message.projectFolder);
              // 更新项目目录为新的项目文件夹路径
              setProjectDir(message.projectFolder);
              // 可以在这里添加成功反馈
            } else {
              console.error('项目文件夹创建失败:', message.error);
              // 可以在这里添加错误反馈
            }
            break;
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  // 监听状态变化并保存
  useEffect(() => {
    if (projectName || projectDir || resolution) {
      saveState({ projectName, projectDir, resolution });
    }
  }, [projectName, projectDir, resolution]);

  const selectDirectory = () => {
    if (vscode) {
      vscode.postMessage({ command: 'selectDirectory' });
    } else {
      alert('目录选择功能需要 VSCode 环境');
    }
  };

  // 处理组件选择
  const handleComponentSelect = (component: any) => {
    setSelectedComponent(component);
  };

  // 处理组件更新
  const handleComponentUpdate = (updatedComponent: any) => {
    setComponents(prev => prev.map(c => 
      c.id === updatedComponent.id ? updatedComponent : c
    ));
    setSelectedComponent(updatedComponent);
  };
  
  // 处理左侧面板宽度调整
  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };
  
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = e.clientX;
    const minWidth = 150; // 减少最小宽度
    const maxWidth = 500;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setLeftPanelWidth(newWidth);
      saveState({ leftPanelWidth: newWidth });
    }
  };
  
  const handleResizeEnd = () => {
    setIsResizing(false);
  };
  
  // 处理组件树高度调整
  const handleTreeResizeStart = (e: React.MouseEvent) => {
    setIsResizingTree(true);
    e.preventDefault();
  };
  
  const handleTreeResizeMove = (e: MouseEvent) => {
    if (!isResizingTree) return;
    
    const container = document.querySelector('.left-panel') as HTMLElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const totalHeight = containerRect.height;
    const mouseY = e.clientY - containerRect.top;
    
    // 计算组件树的高度：总高度减去鼠标位置
    const newHeight = totalHeight - mouseY;
    const minHeight = 100;
    const maxHeight = totalHeight - 80; // 减少组件库最小空间到80px
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setComponentTreeHeight(newHeight);
      saveState({ componentTreeHeight: newHeight });
    }
  };
  
  const handleTreeResizeEnd = () => {
    setIsResizingTree(false);
  };
  
  // 监听鼠标移动和释放事件
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing]);
  
  // 监听组件树高度调整事件
  useEffect(() => {
    if (isResizingTree) {
      document.addEventListener('mousemove', handleTreeResizeMove);
      document.addEventListener('mouseup', handleTreeResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleTreeResizeMove);
        document.removeEventListener('mouseup', handleTreeResizeEnd);
      };
    }
  }, [isResizingTree]);

  if (!resolution) {
    const selected = resolutions.find(r => r.label === selectLabel) || resolutions[0];
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ background: '#e5e7ea', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 400, minHeight: 280 }}>
          <h2 style={{ marginBottom: 24 }}>新建项目</h2>
          {/* 项目名称 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>项目名称</label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="请输入项目名称"
              style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          {/* 项目目录 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>项目目录</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={projectDir}
                onChange={e => setProjectDir(e.target.value)}
                placeholder="请输入项目文件夹路径"
                style={{ flex: 1, padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
              />
              <button
                onClick={selectDirectory}
                style={{ 
                  padding: '8px 12px', 
                  fontSize: 15, 
                  borderRadius: 4, 
                  border: '1px solid #ccc',
                  background: '#f5f5f5',
                  cursor: 'pointer'
                }}
              >
                ...
              </button>
            </div>
          </div>
          {/* 分辨率设置 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>屏幕分辨率</label>
            <select
              value={selectLabel}
              onChange={e => setSelectLabel(e.target.value)}
              style={{ fontSize: 15, padding: 8, minWidth: 120 }}
            >
              {resolutions.map(r => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>
            {selectLabel === '自定义' && (
              <span style={{ marginLeft: 16 }}>
                宽：<input
                  type="number"
                  value={custom.width}
                  min={100}
                  max={1000}
                  onChange={e => setCustom({ ...custom, width: Number(e.target.value) })}
                  style={{ width: 60, marginRight: 12 }}
                />
                高：<input
                  type="number"
                  value={custom.height}
                  min={100}
                  max={1000}
                  onChange={e => setCustom({ ...custom, height: Number(e.target.value) })}
                  style={{ width: 60 }}
                />
              </span>
            )}
          </div>
          <button
            style={{ 
              marginTop: 12, 
              padding: '8px 32px', 
              fontSize: 16,
              float: 'right',
              background: '#8B5CF6',
              border: '1px solid #8B5CF6',
              borderRadius: 4,
              cursor: 'pointer'
            }}
            disabled={!projectName || !projectDir}
            onClick={async () => {
              console.log('点击创建画布按钮');
              const finalResolution = selectLabel === '自定义' 
                ? { label: '自定义', width: custom.width, height: custom.height }
                : selected;
              
              console.log('设置分辨率:', finalResolution);
              setResolution(finalResolution);
              
              // 创建项目时立即生成项目文件夹和 JSON 文件
              try {
                const vscode = getVSCodeApi();
                if (vscode) {
                  console.log('准备创建项目文件夹:', { projectName, projectDir });
                  
                  // 生成初始项目配置
                  const initialConfig = {
                    projectName: projectName,
                    resolution: {
                      width: finalResolution.width,
                      height: finalResolution.height
                    },
                    platform: "web",
                    fontImports: [
                      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    ],
                    FrontJson: [
                      {
                        name: "screen",
                        id: "main-screen",
                        type: "screen",
                        left: 0,
                        top: 0,
                        width: finalResolution.width,
                        height: finalResolution.height,
                        text: "",
                        style: [
                          {
                            backgroundColor: "#ffffff",
                            border: "none",
                            borderRadius: "0px",
                            boxShadow: "none"
                          }
                        ],
                        list: []
                      }
                    ]
                  };
                  
                  const configStr = JSON.stringify(initialConfig, null, 2);
                  console.log('发送 createProjectFolder 消息');
                  
                  // 发送消息给扩展创建项目文件夹和初始项目文件
                  vscode.postMessage({
                    command: 'createProjectFolder',
                    projectName: projectName,
                    fileName: `${projectName}.json`,
                    content: configStr,
                    baseDir: projectDir
                  });
                } else {
                  console.error('VSCode API 不可用');
                }
              } catch (error) {
                console.error('创建项目文件夹失败:', error);
              }
            }}
          >
            创建画布
          </button>
        </div>
      </div>
    );
  }

  return (
         <div style={{ 
       display: 'flex', 
       height: '100vh', 
       flexDirection: 'column',
       userSelect: (isResizing || isResizingTree) ? 'none' : 'auto'
     }}>
      {/* 顶部工具栏 */}
      <Toolbar 
        projectName={projectName}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 左侧面板 */}
        <div 
          className="left-panel"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: leftPanelWidth, 
            borderRight: '1px solid #e0e0e0',
            position: 'relative'
          }}
        >
          {/* 组件库 */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <ComponentPalette />
          </div>
          
          {/* 拖拽分隔线 */}
          <div
            style={{
              height: '4px',
              background: isResizingTree ? '#2196f3' : '#e0e0e0',
              cursor: 'row-resize',
              position: 'relative',
              zIndex: 10
            }}
            onMouseDown={handleTreeResizeStart}
          />
          
          {/* 组件树 */}
          <div style={{ height: componentTreeHeight, minHeight: 0 }}>
            <ComponentTree 
              components={components}
              selectedComponent={selectedComponent}
              onComponentSelect={handleComponentSelect}
            />
          </div>
        </div>
        
        {/* 拖拽分隔线 */}
        <div
          style={{
            width: '4px',
            background: isResizing ? '#2196f3' : '#e0e0e0',
            cursor: 'col-resize',
            position: 'relative',
            zIndex: 10
          }}
          onMouseDown={handleResizeStart}
        />
        
        {/* 中间画布区域 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
          <Canvas 
            width={resolution.width} 
            height={resolution.height} 
            projectName={projectName}
            projectDir={projectDir}
            components={components}
            setComponents={setComponents}
            selectedComponent={selectedComponent}
            onComponentSelect={handleComponentSelect}
          />
        </div>
        
        {/* 右侧属性面板 */}
        <PropertyPanel 
          selectedComponent={selectedComponent}
          onComponentUpdate={handleComponentUpdate}
        />
      </div>
    </div>
  );
};

export default App; 