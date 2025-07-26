// 全局 VSCode API 管理器
let vscodeApi: any = null;

export const getVSCodeApi = () => {
  if (!vscodeApi) {
    try {
      vscodeApi = (window as any).acquireVsCodeApi?.();
    } catch (error) {
      console.warn('无法获取 VSCode API:', error);
      vscodeApi = null;
    }
  }
  return vscodeApi;
};

export const postMessage = (message: any) => {
  const vscode = getVSCodeApi();
  
  if (vscode) {
    try {
      vscode.postMessage(message);
    } catch (error) {
      console.error('发送消息到 VSCode 扩展失败:', error);
    }
  }
}; 