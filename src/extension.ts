import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('gui-builder.openEditor', () => {
    const panel = vscode.window.createWebviewPanel(
      'guiBuilder',
      'GUI Builder',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist'))]
      }
    );

    panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
    
    const distPath = path.join(context.extensionPath, 'dist');
    const indexPath = path.join(distPath, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    


    const iconUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'icon.png'))
    );

    html = html.replace(
      /<link\s+rel=["']icon["']\s+href=["']icon\.png["']\s*\/>/,
      `<link rel="icon" href="${iconUri}" />`
    );
    // 生成 bundle.js 的 webview 资源路径
    const bundleUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(distPath, 'bundle.js'))
    );

    // 替换 index.html 里的 bundle.js 路径
    html = html.replace(
      /<script\s+defer\s+src=["']bundle\.js["']><\/script>/,
      `<script defer src="${bundleUri}"></script>`
    );

    panel.webview.html = html;
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {} 