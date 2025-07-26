"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ComponentPalette_1 = __importDefault(require("./components/ComponentPalette"));
const Canvas_1 = __importDefault(require("./editor/Canvas"));
const resolutions = [
    { label: '240x240', width: 240, height: 240 },
    { label: '390x390', width: 390, height: 390 },
    { label: '454x454', width: 454, height: 454 },
    { label: '自定义', width: 320, height: 320 }
];
const vscodeApi_1 = require("./utils/vscodeApi");
// 获取 VSCode API
const vscode = (0, vscodeApi_1.getVSCodeApi)();
const App = () => {
    const [resolution, setResolution] = (0, react_1.useState)(() => {
        // 从 VSCode 状态中恢复分辨率设置
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const state = vscode.getState();
            return (state === null || state === void 0 ? void 0 : state.resolution) || null;
        }
        return null;
    });
    const [selectLabel, setSelectLabel] = (0, react_1.useState)(resolutions[0].label);
    const [custom, setCustom] = (0, react_1.useState)({ width: 320, height: 320 });
    const [projectName, setProjectName] = (0, react_1.useState)(() => {
        // 从 VSCode 状态中恢复项目名称
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const state = vscode.getState();
            return (state === null || state === void 0 ? void 0 : state.projectName) || '';
        }
        return '';
    });
    const [projectDir, setProjectDir] = (0, react_1.useState)(() => {
        // 从 VSCode 状态中恢复项目目录
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const state = vscode.getState();
            return (state === null || state === void 0 ? void 0 : state.projectDir) || '';
        }
        return '';
    });
    // 保存状态到 VSCode
    const saveState = (newState) => {
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const currentState = vscode.getState() || {};
            vscode.setState(Object.assign(Object.assign({}, currentState), newState));
        }
    };
    // 初始化项目名称和目录
    (0, react_1.useEffect)(() => {
        // 从 VSCode 插件获取工作目录
        const currentDir = window.vscodeWorkspacePath || '/';
        if (!projectDir) {
            setProjectDir(currentDir);
        }
        // 检查项目名称是否存在，自动递增
        const checkProjectName = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!projectName) {
                let name = 'project1';
                let counter = 1;
                while (true) {
                    try {
                        // 这里可以添加检查逻辑，暂时用简单的递增
                        const testName = `project${counter}`;
                        // 实际项目中可以检查文件夹是否存在
                        // const exists = await fs.existsSync(path.join(currentDir, testName));
                        // if (!exists) {
                        //   name = testName;
                        //   break;
                        // }
                        name = testName;
                        break; // 暂时直接使用，后续可以添加真实检查
                    }
                    catch (error) {
                        counter++;
                    }
                }
                setProjectName(name);
            }
        });
        checkProjectName();
        // 监听来自插件的消息
        if (vscode) {
            const handleMessage = (event) => {
                const message = event.data;
                switch (message.command) {
                    case 'directorySelected':
                        setProjectDir(message.path);
                        break;
                    case 'projectFolderCreated':
                        if (message.success) {
                            console.log('项目文件夹创建成功:', message.projectFolder);
                            // 更新项目目录为新的项目文件夹路径
                            setProjectDir(message.projectFolder);
                            // 可以在这里添加成功反馈
                        }
                        else {
                            console.error('项目文件夹创建失败:', message.error);
                            // 可以在这里添加错误反馈
                        }
                        break;
                }
            };
            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        }
    }, []);
    // 监听状态变化并保存
    (0, react_1.useEffect)(() => {
        if (projectName || projectDir || resolution) {
            saveState({ projectName, projectDir, resolution });
        }
    }, [projectName, projectDir, resolution]);
    const selectDirectory = () => {
        if (vscode) {
            vscode.postMessage({ command: 'selectDirectory' });
        }
        else {
            alert('目录选择功能需要 VSCode 环境');
        }
    };
    if (!resolution) {
        const selected = resolutions.find(r => r.label === selectLabel) || resolutions[0];
        return ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fff' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { background: '#e5e7ea', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 400, minHeight: 280 }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { marginBottom: 24 }, children: "\u65B0\u5EFA\u9879\u76EE" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 18 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 6, fontWeight: 500 }, children: "\u9879\u76EE\u540D\u79F0" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: projectName, onChange: e => setProjectName(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0", style: { width: '100%', padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 18 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 6, fontWeight: 500 }, children: "\u9879\u76EE\u76EE\u5F55" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: projectDir, onChange: e => setProjectDir(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u9879\u76EE\u6587\u4EF6\u5939\u8DEF\u5F84", style: { flex: 1, padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 } }), (0, jsx_runtime_1.jsx)("button", { onClick: selectDirectory, style: {
                                            padding: '8px 12px',
                                            fontSize: 15,
                                            borderRadius: 4,
                                            border: '1px solid #ccc',
                                            background: '#f5f5f5',
                                            cursor: 'pointer'
                                        }, children: "..." })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 18 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 6, fontWeight: 500 }, children: "\u5C4F\u5E55\u5206\u8FA8\u7387" }), (0, jsx_runtime_1.jsx)("select", { value: selectLabel, onChange: e => setSelectLabel(e.target.value), style: { fontSize: 15, padding: 8, minWidth: 120 }, children: resolutions.map(r => ((0, jsx_runtime_1.jsx)("option", { value: r.label, children: r.label }, r.label))) }), selectLabel === '自定义' && ((0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 16 }, children: ["\u5BBD\uFF1A", (0, jsx_runtime_1.jsx)("input", { type: "number", value: custom.width, min: 100, max: 1000, onChange: e => setCustom(Object.assign(Object.assign({}, custom), { width: Number(e.target.value) })), style: { width: 60, marginRight: 12 } }), "\u9AD8\uFF1A", (0, jsx_runtime_1.jsx)("input", { type: "number", value: custom.height, min: 100, max: 1000, onChange: e => setCustom(Object.assign(Object.assign({}, custom), { height: Number(e.target.value) })), style: { width: 60 } })] }))] }), (0, jsx_runtime_1.jsx)("button", { style: {
                            marginTop: 12,
                            padding: '8px 32px',
                            fontSize: 16,
                            float: 'right',
                            background: '#8B5CF6',
                            border: '1px solid #8B5CF6',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }, disabled: !projectName || !projectDir, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                            console.log('点击创建画布按钮');
                            const finalResolution = selectLabel === '自定义'
                                ? { label: '自定义', width: custom.width, height: custom.height }
                                : selected;
                            console.log('设置分辨率:', finalResolution);
                            setResolution(finalResolution);
                            // 创建项目时立即生成项目文件夹和 JSON 文件
                            try {
                                const vscode = (0, vscodeApi_1.getVSCodeApi)();
                                if (vscode) {
                                    console.log('准备创建项目文件夹:', { projectName, projectDir });
                                    // 生成初始项目配置
                                    const initialConfig = {
                                        projectName: projectName,
                                        resolution: {
                                            width: finalResolution.width,
                                            height: finalResolution.height
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
                                                width: finalResolution.width,
                                                height: finalResolution.height,
                                                text: "",
                                                style: [
                                                    {
                                                        backgroundColor: "#ffffff",
                                                        border: "none",
                                                        borderRadius: "0px",
                                                        boxShadow: "none"
                                                    }
                                                ],
                                                list: []
                                            }
                                        ]
                                    };
                                    const configStr = JSON.stringify(initialConfig, null, 2);
                                    console.log('发送 createProjectFolder 消息');
                                    // 发送消息给扩展创建项目文件夹和初始项目文件
                                    vscode.postMessage({
                                        command: 'createProjectFolder',
                                        projectName: projectName,
                                        fileName: `${projectName}.uiproj`,
                                        content: configStr,
                                        baseDir: projectDir
                                    });
                                }
                                else {
                                    console.error('VSCode API 不可用');
                                }
                            }
                            catch (error) {
                                console.error('创建项目文件夹失败:', error);
                            }
                        }), children: "\u521B\u5EFA\u753B\u5E03" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', height: '100vh' }, children: [(0, jsx_runtime_1.jsx)(ComponentPalette_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { padding: 12, borderBottom: '1px solid #eee', background: '#f7f7f7' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "\u9879\u76EE\u540D\u79F0\uFF1A" }), (0, jsx_runtime_1.jsx)("span", { style: { marginRight: 24, fontWeight: 500 }, children: projectName }), (0, jsx_runtime_1.jsx)("span", { children: "\u9879\u76EE\u76EE\u5F55\uFF1A" }), (0, jsx_runtime_1.jsx)("span", { style: { marginRight: 24, fontWeight: 500 }, children: projectDir }), (0, jsx_runtime_1.jsx)("span", { children: "\u5C4F\u5E55\u5206\u8FA8\u7387\uFF1A" }), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 8, fontWeight: 500 }, children: [resolution.label, "\uFF08", resolution.width, " x ", resolution.height, "\uFF09"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e5e7ea' }, children: (0, jsx_runtime_1.jsx)(Canvas_1.default, { width: resolution.width, height: resolution.height, projectName: projectName, projectDir: projectDir }) })] })] }));
};
exports.default = App;
