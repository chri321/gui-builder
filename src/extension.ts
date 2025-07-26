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
        retainContextWhenHidden: true, // 保持上下文，避免重新加载
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist'))]
      }
    );
    // 设置 Webview 面板图标
    panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
    
    const distPath = path.join(context.extensionPath, 'dist');
    const indexPath = path.join(distPath, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    // 生成 bundle.js 的 webview 资源路径
    const bundleUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(distPath, 'bundle.js'))
    );

    // 替换 index.html 里的 bundle.js 路径
    html = html.replace(
      /<script\s+defer\s+src=["']bundle\.js["']><\/script>/,
      `<script defer src="${bundleUri}"></script>`
    );

    // 获取当前工作目录并注入到 HTML 中
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
    html = html.replace(
      '</head>',
      `<script>window.vscodeWorkspacePath = "${workspaceFolder.replace(/\\/g, '\\\\')}";</script></head>`
    );

    panel.webview.html = html;

    // 处理来自 Webview 的消息
    panel.webview.onDidReceiveMessage(
      async message => {
        switch (message.command) {
          case 'selectDirectory':
            try {
              const result = await vscode.window.showOpenDialog({
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
            } catch (error) {
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
                    await vscode.workspace.updateWorkspaceFolders(
                      0, // 替换第一个工作区
                      vscode.workspace.workspaceFolders.length, // 移除所有现有工作区
                      { uri: projectFolderUri, name: projectName }
                    );
                                         console.log('工作目录已切换到项目文件夹:', projectFolderPath);
                   } else {
                     // 方法2：如果没有工作区，则添加新的工作区
                     await vscode.workspace.updateWorkspaceFolders(
                       0,
                       null,
                       { uri: projectFolderUri, name: projectName }
                     );
                   }
                  
                  // 弹出保存工作区提示
                  vscode.window.showInformationMessage(
                    `项目文件夹已添加到工作区，建议立即保存工作区以避免丢失。`,
                    '保存工作区'
                  ).then(selection => {
                    if (selection === '保存工作区') {
                      vscode.commands.executeCommand('workbench.action.saveWorkspaceAs');
                    }
                  });
                                 } catch (error) {
                   console.error('切换工作目录失败:', error);
                   // 备用方案：尝试添加文件夹到工作区
                   try {
                     const projectFolderUri = vscode.Uri.file(projectFolderPath);
                     await vscode.workspace.updateWorkspaceFolders(
                       vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0,
                       null,
                       { uri: projectFolderUri, name: projectName }
                     );
                   } catch (addError) {
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
              
                         } catch (error) {
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
              
                         } catch (error) {
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
      },
      undefined,
      context.subscriptions
    );
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {} 