"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const projectConfig_1 = require("../utils/projectConfig");
const vscodeApi_1 = require("../utils/vscodeApi");
const Canvas = ({ width, height, projectName, projectDir }) => {
    const [components, setComponents] = (0, react_1.useState)(() => {
        // 从 VSCode 状态中恢复组件
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const state = vscode.getState();
            return (state === null || state === void 0 ? void 0 : state.canvasComponents) || [];
        }
        return [];
    });
    const [editingId, setEditingId] = (0, react_1.useState)(null);
    // 保存组件状态到 VSCode
    const saveCanvasState = (newComponents) => {
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const currentState = vscode.getState() || {};
            vscode.setState(Object.assign(Object.assign({}, currentState), { canvasComponents: newComponents }));
        }
    };
    // 监听来自扩展的消息
    (0, react_1.useEffect)(() => {
        const handleMessage = (event) => {
            const message = event.data;
            if (message.command === 'projectSaved') {
                if (message.success) {
                    // 可以在这里添加成功反馈
                }
                else {
                    // 可以在这里添加错误反馈
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    // 监听组件变化并保存状态
    (0, react_1.useEffect)(() => {
        saveCanvasState(components);
    }, [components]);
    const onDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('component-type');
        const label = e.dataTransfer.getData('component-label');
        const componentId = e.dataTransfer.getData('component-id');
        if (!type)
            return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (componentId) {
            // 更新现有组件位置
            setComponents(cs => cs.map(c => c.id === componentId ? Object.assign(Object.assign({}, c), { x, y }) : c));
        }
        else {
            // 添加新组件
            setComponents(cs => [
                ...cs,
                { id: Date.now() + '-' + Math.random(), type, label: label || type, x, y }
            ]);
        }
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const handleTextEdit = (id, newText) => {
        setComponents(cs => cs.map(c => c.id === id ? Object.assign(Object.assign({}, c), { label: newText }) : c));
        setEditingId(null);
    };
    const handleTextClick = (id) => {
        setEditingId(id);
    };
    const handleComponentDragStart = (e, component) => {
        e.dataTransfer.setData('component-type', component.type);
        e.dataTransfer.setData('component-label', component.label);
        e.dataTransfer.setData('component-id', component.id);
    };
    const handleSaveProject = () => {
        if (projectName && projectDir) {
            (0, projectConfig_1.saveProject)(components, projectName, projectDir, { width, height });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative' }, children: [projectName && projectDir && ((0, jsx_runtime_1.jsx)("button", { onClick: handleSaveProject, style: {
                    position: 'absolute',
                    top: -40,
                    right: 0,
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    zIndex: 1000
                }, children: "\u4FDD\u5B58\u9879\u76EE" })), (0, jsx_runtime_1.jsx)("div", { style: {
                    width,
                    height,
                    position: 'relative',
                    background: '#fff',
                    border: '1px solid #bbb',
                    borderRadius: 8,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    margin: 24
                }, onDrop: onDrop, onDragOver: onDragOver, children: components.map(c => ((0, jsx_runtime_1.jsx)("div", { draggable: true, onDragStart: (e) => handleComponentDragStart(e, c), style: Object.assign({ position: 'absolute', left: c.x, top: c.y }, (c.type === 'text' ? {
                        color: '#333',
                        fontSize: '14px',
                        cursor: editingId === c.id ? 'text' : 'grab'
                    } : {
                        // 按钮组件：有外框背景
                        margin: '8px 0',
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: 4,
                        textAlign: 'center',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        minWidth: 60,
                        cursor: 'grab'
                    })), onClick: () => c.type === 'text' && handleTextClick(c.id), children: c.type === 'text' && editingId === c.id ? ((0, jsx_runtime_1.jsx)("input", { type: "text", value: c.label, onChange: (e) => {
                            setComponents(cs => cs.map(comp => comp.id === c.id ? Object.assign(Object.assign({}, comp), { label: e.target.value }) : comp));
                        }, onBlur: () => handleTextEdit(c.id, c.label), onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                handleTextEdit(c.id, c.label);
                            }
                            if (e.key === 'Escape') {
                                setEditingId(null);
                            }
                        }, style: {
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#333',
                            fontSize: '14px',
                            width: `${Math.max(c.label.length * 8, 60)}px`,
                            padding: '0',
                            margin: '0',
                            fontFamily: 'inherit'
                        }, autoFocus: true })) : (c.label) }, c.id))) })] }));
};
exports.default = Canvas;
