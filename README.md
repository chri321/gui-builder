# GUI Builder VSCode 插件

本项目是一个基于 React 的 VSCode 插件，提供类似 grapesjs 的可视化 GUI 编辑器，支持穿戴设备界面设计、C++ 代码生成与编译调试。

## 目录结构

```
gui-builder/
├─ src/
│  ├─ extension/         # VSCode 插件主进程
│  ├─ webview/           # 前端 React 应用
│  ├─ codegen/           # C++ 代码生成相关
│  └─ assets/            # 静态资源
├─ dist/                 # 前端打包输出
├─ package.json
├─ tsconfig.json
├─ webpack.config.js
└─ README.md
```

## 开发与运行

1. 安装依赖：`npm install`
2. 打包前端：`npx webpack`
3. 在 VSCode 插件开发模式下运行调试

## 功能规划
- 拖拽式 GUI 编辑器
- 组件/模板库
- 多分辨率适配
- C++ 代码自动生成与编译
- 调试与日志 