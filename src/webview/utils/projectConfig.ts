import type { CanvasComponent } from '../editor/Canvas';
import { postMessage } from './vscodeApi';

export interface ProjectConfig {
  projectName: string;
  resolution: {
    width: number;
    height: number;
  };
  platform: string;
  fontImports: string[];
  FrontJson: Array<{
    name: string;
    id: string;
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    text: string;
    style: any[];
    list?: Array<{
      name: string;
      id: string;
      type: string;
      left: number;
      top: number;
      width: number;
      height: number;
      text: string;
      style: any[];
    }>;
  }>;
}

export const generateProjectConfig = (
  components: CanvasComponent[],
  projectName: string,
  resolution: { width: number; height: number }
): ProjectConfig => {
  const projectConfig: ProjectConfig = {
    projectName: projectName || "gui-project",
    resolution: {
      width: resolution.width,
      height: resolution.height
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
        width: resolution.width,
        height: resolution.height,
        text: "",
        style: [
          {
            backgroundColor: "#ffffff",
            border: "none",
            borderRadius: "0px",
            boxShadow: "none"
          }
        ],
        list: components.map((comp, index) => {
          const baseStyle = comp.type === 'button' 
            ? {
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: comp.width || 80,
                minHeight: comp.height || 36
              }
            : {
                backgroundColor: "transparent",
                color: "#000000",
                border: "none",
                fontSize: "14px",
                fontWeight: "400",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                minWidth: comp.width || 60,
                minHeight: comp.height || 20
              };

          return {
            name: comp.type === 'button' ? `btn_${index + 1}` : `label_${index + 1}`,
            id: comp.id,
            type: comp.type === 'button' ? 'btn' : 'label',
            left: comp.x,
            top: comp.y,
            width: comp.width || (comp.type === 'button' ? 80 : 60),
            height: comp.height || (comp.type === 'button' ? 36 : 20),
            text: comp.label,
            style: [baseStyle]
          };
        })
      }
    ]
  };

  return projectConfig;
};



export const saveProject = (
  components: CanvasComponent[],
  projectName: string,
  projectDir: string,
  resolution: { width: number; height: number }
): void => {
  try {
    const config = generateProjectConfig(components, projectName, resolution);
    const configStr = JSON.stringify(config, null, 2);
    
    const message = {
      command: 'saveProjectFile',
      fileName: `${projectName || 'gui-project'}.json`,
      content: configStr,
      projectDir: projectDir
    };
    postMessage(message);
    
    // 添加用户反馈
    const feedbackDiv = document.createElement('div');
    feedbackDiv.textContent = '正在保存项目...';
    feedbackDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(feedbackDiv);
    
    // 3秒后移除反馈
    setTimeout(() => {
      if (document.body.contains(feedbackDiv)) {
        document.body.removeChild(feedbackDiv);
      }
    }, 3000);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    alert(`保存项目失败: ${errorMessage}`);
  }
}; 