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
    if (vscode) {
        try {
            vscode.postMessage(message);
        }
        catch (error) {
            console.error('发送消息到 VSCode 扩展失败:', error);
        }
    }
};
exports.postMessage = postMessage;
