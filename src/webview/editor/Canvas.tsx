import React, { useState, useEffect } from 'react';
import { saveProject } from '../utils/projectConfig';
import { getVSCodeApi } from '../utils/vscodeApi';

export interface CanvasComponent {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  style?: any;
}

interface CanvasProps {
  width: number;
  height: number;
  projectName?: string;
  projectDir?: string;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
  components?: CanvasComponent[];
  setComponents?: (components: CanvasComponent[]) => void;
  selectedComponent?: CanvasComponent | null;
  onComponentSelect?: (component: CanvasComponent) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  width, 
  height, 
  projectName, 
  projectDir,
  viewMode = 'desktop',
  components: externalComponents,
  setComponents: setExternalComponents,
  selectedComponent,
  onComponentSelect
}) => {
  // 内部组件状态（向后兼容）
  const [internalComponents, setInternalComponents] = useState<CanvasComponent[]>(() => {
    // 从 VSCode 状态中恢复组件
    const vscode = getVSCodeApi();
    if (vscode) {
      const state = vscode.getState();
      return state?.canvasComponents || [];
    }
    return [];
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  // 使用外部组件状态或内部状态
  const components = externalComponents || internalComponents;
  const setComponents = setExternalComponents || setInternalComponents;

  // 类型安全的组件更新函数
  const updateComponents = (updater: (components: CanvasComponent[]) => CanvasComponent[]) => {
    if (setExternalComponents) {
      setExternalComponents(updater(components));
    } else {
      setInternalComponents(updater(components));
    }
  };

  // 根据视图模式调整画布尺寸
  const getCanvasSize = () => {
    switch (viewMode) {
      case 'tablet':
        return { width: Math.min(width, 768), height: Math.min(height, 1024) };
      case 'mobile':
        return { width: Math.min(width, 375), height: Math.min(height, 667) };
      default:
        return { width, height };
    }
  };

  const canvasSize = getCanvasSize();

  // 保存组件状态到 VSCode
  const saveCanvasState = (newComponents: CanvasComponent[]) => {
    const vscode = getVSCodeApi();
    if (vscode) {
      const currentState = vscode.getState() || {};
      vscode.setState({ ...currentState, canvasComponents: newComponents });
    }
  };

  // 监听来自扩展的消息
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      
      if (message.command === 'projectSaved') {
        if (message.success) {
          // 可以在这里添加成功反馈
        } else {
          // 可以在这里添加错误反馈
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 监听组件变化并保存状态
  useEffect(() => {
    saveCanvasState(components);
  }, [components]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('component-type');
    const label = e.dataTransfer.getData('component-label');
    const componentId = e.dataTransfer.getData('component-id');
    
    if (!type) return;
    
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (componentId) {
      // 更新现有组件位置
      updateComponents(cs => cs.map(c => 
        c.id === componentId ? { ...c, x, y } : c
      ));
    } else {
      // 添加新组件
      const newComponent: CanvasComponent = { 
        id: Date.now() + '-' + Math.random(), 
        type, 
        label: label || type, 
        x, 
        y,
        style: type === 'button' ? {
          backgroundColor: '#f5f5f5',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        } : {}
      };
      updateComponents(cs => [...cs, newComponent]);
      
      // 自动选择新添加的组件
      if (onComponentSelect) {
        onComponentSelect(newComponent);
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTextEdit = (id: string, newText: string) => {
    updateComponents(cs => cs.map(c => 
      c.id === id ? { ...c, label: newText } : c
    ));
    setEditingId(null);
  };

  const handleTextClick = (id: string) => {
    setEditingId(id);
  };

  const handleComponentClick = (component: CanvasComponent) => {
    if (onComponentSelect) {
      onComponentSelect(component);
    }
  };

  const handleComponentDragStart = (e: React.DragEvent, component: CanvasComponent) => {
    e.dataTransfer.setData('component-type', component.type);
    e.dataTransfer.setData('component-label', component.label);
    e.dataTransfer.setData('component-id', component.id);
  };

  const handleSaveProject = () => {
    if (projectName && projectDir) {
      saveProject(components, projectName, projectDir, { width, height });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {projectName && projectDir && (
        <button 
          onClick={handleSaveProject}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 1000
          }}
        >
          保存项目
        </button>
      )}
      
      
      
      <div
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          position: 'relative',
          background: '#fff',
          border: '2px solid #e5e7eb',
          borderRadius: 8,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {components.map(c => (
          <div
            key={c.id}
            draggable
            onDragStart={(e) => handleComponentDragStart(e, c)}
            onClick={() => handleComponentClick(c)}
                         style={{
               position: 'absolute',
               left: c.x,
               top: c.y,
               border: selectedComponent?.id === c.id ? '2px solid #3b82f6' : '2px solid transparent',
               ...(c.type === 'text' ? {
                 color: c.style?.color || '#333',
                 fontSize: c.style?.fontSize || '14px',
                 cursor: editingId === c.id ? 'text' : 'pointer',
                 backgroundColor: c.style?.backgroundColor || 'transparent',
                 padding: c.style?.padding || '0',
                 borderRadius: c.style?.borderRadius || '0'
               } : {
                 // 按钮组件：有外框背景
                 cursor: 'grab',
                 margin: '8px 0',
                 padding: c.style?.padding || '8px 12px',
                 background: c.style?.backgroundColor || '#f5f5f5',
                 borderRadius: c.style?.borderRadius || '4px',
                 textAlign: 'center',
                 boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                 minWidth: 60,
                 color: c.style?.color || '#333',
                 fontSize: c.style?.fontSize || '14px'
               })
             }}
          >
            {c.type === 'text' && editingId === c.id ? (
              <input
                type="text"
                value={c.label}
                                 onChange={(e) => {
                   updateComponents(cs => cs.map(comp => 
                     comp.id === c.id ? { ...comp, label: e.target.value } : comp
                   ));
                 }}
                onBlur={() => handleTextEdit(c.id, c.label)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTextEdit(c.id, c.label);
                  }
                  if (e.key === 'Escape') {
                    setEditingId(null);
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#333',
                  fontSize: '14px',
                  width: `${Math.max(c.label.length * 8, 60)}px`,
                  padding: '0',
                  margin: '0',
                  fontFamily: 'inherit'
                }}
                autoFocus
              />
            ) : (
              <span onClick={() => c.type === 'text' && handleTextClick(c.id)}>
                {c.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas; 