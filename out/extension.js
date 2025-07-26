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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// 新增：WebviewViewProvider 实现
class GuiBuilderViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true
        };
        webviewView.webview.html = `
      <html>
        <head>
          <style>
            .gui-btn {
              width: 90%;
              background: #0E639C;
              color: #fff;
              border: none;
              border-radius: 4px;
              font-size: 12px;
              padding: 7px 0;
              margin-bottom: 7px;
              cursor: pointer;
              font-family: 'Microsoft YaHei', 微软雅黑, sans-serif;
              transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
              display: block;
              outline: none;
            }
            .gui-btn:hover, .gui-btn:focus {
              background: #1177bb;
              box-shadow: 0 2px 8px 0 rgba(14,99,156,0.15);
            }
            .gui-btn:active {
              background: #0E639C;
              box-shadow: 0 1px 4px 0 rgba(14,99,156,0.10);
            }
          </style>
          </style>
        </head>
        <body style="padding: 10px 10px; font-family: 'Microsoft YaHei', 微软雅黑, sans-serif; background: var(--vscode-sideBar-background);">
          <div style="color: #bfc7d5; font-size: 12px; margin-bottom: 8px; line-height: 1.5;">
            您尚未打开任何 GUI Builder 项目。<br/><br/>
            您可以打开一个已有的 GUI Builder 项目（包含 <span style="color:#7ecbe7;">project.json</span> 文件的文件夹）。
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <button id="openProjectBtn" class="gui-btn">
              选择项目文件夹
            </button>
            <div style="color: #bfc7d5; font-size: 12px; margin-bottom: 7px; line-height: 1.5; width: 100%; text-align: left;">
              您也可以创建一个新的 GUI Builder 项目。
            </div>
            <button id="createProjectBtn" class="gui-btn">
              新建项目
            </button>
          </div>
          <script>
            const vscode = acquireVsCodeApi();
            document.getElementById('createProjectBtn').onclick = () => {
              vscode.postMessage({ command: 'createProject' });
            };
            document.getElementById('openProjectBtn').onclick = () => {
              vscode.postMessage({ command: 'openProject' });
            };
          </script>
        </body>
      </html>
    `;
        webviewView.webview.onDidReceiveMessage(message => {
            if (message.command === 'createProject') {
                vscode.commands.executeCommand('gui-builder.openEditor');
            }
        });
    }
}
GuiBuilderViewProvider.viewType = 'guiBuilderView';
function activate(context) {
    // 注册侧边栏视图 provider
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(GuiBuilderViewProvider.viewType, new GuiBuilderViewProvider(context.extensionUri)));
    const disposable = vscode.commands.registerCommand('gui-builder.openEditor', () => {
        var _a, _b;
        const panel = vscode.window.createWebviewPanel('guiBuilder', 'GUI Builder', vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true, // 保持上下文，避免重新加载
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist'))]
        });
        // 设置 Webview 面板图标
        panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
        const distPath = path.join(context.extensionPath, 'dist');
        const indexPath = path.join(distPath, 'index.html');
        let html = fs.readFileSync(indexPath, 'utf8');
        // 生成 bundle.js 的 webview 资源路径
        const bundleUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(distPath, 'bundle.js')));
        // 替换 index.html 里的 bundle.js 路径
        html = html.replace(/<script\s+defer\s+src=["']bundle\.js["']><\/script>/, `<script defer src="${bundleUri}"></script>`);
        // 获取当前工作目录并注入到 HTML 中
        const workspaceFolder = ((_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.uri.fsPath) || process.cwd();
        html = html.replace('</head>', `<script>window.vscodeWorkspacePath = "${workspaceFolder.replace(/\\/g, '\\\\')}";</script></head>`);
        panel.webview.html = html;
        // 处理来自 Webview 的消息
        panel.webview.onDidReceiveMessage((message) => __awaiter(this, void 0, void 0, function* () {
            switch (message.command) {
                case 'selectDirectory':
                    try {
                        const result = yield vscode.window.showOpenDialog({
                            canSelectFiles: false,
                            canSelectFolders: true,
                            canSelectMany: false,
                            openLabel: '选择项目目录'
                        });
                        if (result && result.length > 0) {
                            panel.webview.postMessage({
                                command: 'directorySelected',
                                path: result[0].fsPath
                            });
                        }
                    }
                    catch (error) {
                        vscode.window.showErrorMessage('选择目录失败: ' + error);
                    }
                    break;
                case 'createProjectFolder':
                    try {
                        const { projectName, fileName, content, baseDir } = message;
                        if (!projectName || !fileName || !content || !baseDir) {
                            throw new Error('缺少必要的参数: projectName, fileName, content, 或 baseDir');
                        }
                        // 创建项目文件夹路径
                        const projectFolderPath = path.join(baseDir, projectName);
                        // 检查项目文件夹是否已存在
                        if (fs.existsSync(projectFolderPath)) {
                            // 发送成功消息回webview，但不切换工作目录
                            panel.webview.postMessage({
                                command: 'projectFolderCreated',
                                success: true,
                                projectFolder: projectFolderPath,
                                filePath: path.join(projectFolderPath, fileName),
                                alreadyExists: true
                            });
                            return;
                        }
                        // 创建项目文件夹
                        fs.mkdirSync(projectFolderPath, { recursive: true });
                        // 在项目文件夹内创建 JSON 文件
                        const filePath = path.join(projectFolderPath, fileName);
                        // 写入初始配置文件
                        fs.writeFileSync(filePath, content, 'utf8');
                        // 显示成功消息
                        vscode.window.showInformationMessage(` 项目文件夹已创建: ${projectName}`);
                        // 将工作目录切换到新创建的项目文件夹（在当前窗口中）
                        try {
                            const projectFolderUri = vscode.Uri.file(projectFolderPath);
                            // 方法1：尝试替换当前工作区
                            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                                yield vscode.workspace.updateWorkspaceFolders(0, // 替换第一个工作区
                                vscode.workspace.workspaceFolders.length, // 移除所有现有工作区
                                { uri: projectFolderUri, name: projectName });
                                console.log('工作目录已切换到项目文件夹:', projectFolderPath);
                            }
                            else {
                                // 方法2：如果没有工作区，则添加新的工作区
                                yield vscode.workspace.updateWorkspaceFolders(0, null, { uri: projectFolderUri, name: projectName });
                            }
                            // 弹出保存工作区提示
                            vscode.window.showInformationMessage(`项目文件夹已添加到工作区，建议立即保存工作区以避免丢失。`, '保存工作区').then(selection => {
                                if (selection === '保存工作区') {
                                    vscode.commands.executeCommand('workbench.action.saveWorkspaceAs');
                                }
                            });
                        }
                        catch (error) {
                            console.error('切换工作目录失败:', error);
                            // 备用方案：尝试添加文件夹到工作区
                            try {
                                const projectFolderUri = vscode.Uri.file(projectFolderPath);
                                yield vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: projectFolderUri, name: projectName });
                            }
                            catch (addError) {
                                console.error('添加文件夹到工作区失败:', addError);
                            }
                        }
                        // 发送成功消息回webview，包含新的项目目录路径
                        panel.webview.postMessage({
                            command: 'projectFolderCreated',
                            success: true,
                            projectFolder: projectFolderPath,
                            filePath: filePath
                        });
                    }
                    catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        vscode.window.showErrorMessage(`创建项目文件夹失败: ${errorMessage}`);
                        // 发送错误消息回webview
                        panel.webview.postMessage({
                            command: 'projectFolderCreated',
                            success: false,
                            error: errorMessage
                        });
                    }
                    break;
                case 'saveProjectFile':
                    try {
                        const { fileName, content, projectDir } = message;
                        if (!fileName || !content || !projectDir) {
                            throw new Error('缺少必要的参数: fileName, content, 或 projectDir');
                        }
                        const filePath = path.join(projectDir, fileName);
                        // 确保项目目录存在
                        if (!fs.existsSync(projectDir)) {
                            fs.mkdirSync(projectDir, { recursive: true });
                        }
                        // 写入配置文件
                        fs.writeFileSync(filePath, content, 'utf8');
                        // 显示成功消息
                        vscode.window.showInformationMessage(`✅ 项目文件已保存: ${fileName}`);
                        // 发送成功消息回webview
                        panel.webview.postMessage({
                            command: 'projectSaved',
                            success: true,
                            filePath: filePath
                        });
                    }
                    catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        vscode.window.showErrorMessage(`保存项目文件失败: ${errorMessage}`);
                        // 发送错误消息回webview
                        panel.webview.postMessage({
                            command: 'projectSaved',
                            success: false,
                            error: errorMessage
                        });
                    }
                    break;
            }
        }), undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
