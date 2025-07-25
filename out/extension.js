"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('gui-builder.openEditor', () => {
        const panel = vscode.window.createWebviewPanel('guiBuilder', 'GUI Builder', vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist'))]
        });
        panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
        const distPath = path.join(context.extensionPath, 'dist');
        const indexPath = path.join(distPath, 'index.html');
        let html = fs.readFileSync(indexPath, 'utf8');
        const iconUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'icon.png')));
        html = html.replace(/<link\s+rel=["']icon["']\s+href=["']icon\.png["']\s*\/>/, `<link rel="icon" href="${iconUri}" />`);
        // 生成 bundle.js 的 webview 资源路径
        const bundleUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(distPath, 'bundle.js')));
        // 替换 index.html 里的 bundle.js 路径
        html = html.replace(/<script\s+defer\s+src=["']bundle\.js["']><\/script>/, `<script defer src="${bundleUri}"></script>`);
        panel.webview.html = html;
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
