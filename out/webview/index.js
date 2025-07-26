"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
const container = document.getElementById('root');
if (container) {
    const root = (0, client_1.createRoot)(container);
    // 渲染应用
    root.render((0, jsx_runtime_1.jsx)(App_1.default, {}));
    // 应用加载完成后隐藏加载动画
    setTimeout(() => {
        if (window.hideLoading) {
            window.hideLoading();
        }
    }, 100); // 短暂延迟确保 React 已经渲染完成
}
