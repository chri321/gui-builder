"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getVSCodeApi = void 0;
// 全局 VSCode API 管理器
let vscodeApi = null;
const getVSCodeApi = () => {
    var _a, _b;
    if (!vscodeApi) {
        try {
            vscodeApi = (_b = (_a = window).acquireVsCodeApi) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        catch (error) {
            console.warn('无法获取 VSCode API:', error);
            vscodeApi = null;
        }
    }
    return vscodeApi;
};
exports.getVSCodeApi = getVSCodeApi;
const postMessage = (message) => {
    const vscode = (0, exports.getVSCodeApi)();
    console.log('postMessage 调用:', message);
    console.log('VSCode API 状态:', vscode ? '可用' : '不可用');
    if (vscode) {
        try {
            vscode.postMessage(message);
            console.log('消息已发送到 VSCode 扩展');
        }
        catch (error) {
            console.error('发送消息到 VSCode 扩展失败:', error);
        }
    }
    else {
        console.warn('VSCode API 不可用，无法发送消息');
    }
};
exports.postMessage = postMessage;
