"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const projectConfig_1 = require("../utils/projectConfig");
const vscodeApi_1 = require("../utils/vscodeApi");
const Canvas = ({ width, height, projectName, projectDir, components: externalComponents, setComponents: setExternalComponents, selectedComponent, onComponentSelect }) => {
    // 内部组件状态（向后兼容）
    const [internalComponents, setInternalComponents] = (0, react_1.useState)(() => {
        // 从 VSCode 状态中恢复组件
        const vscode = (0, vscodeApi_1.getVSCodeApi)();
        if (vscode) {
            const state = vscode.getState();
            return (state === null || state === void 0 ? void 0 : state.canvasComponents) || [];
        }
        return [];
    });
    const [editingId, setEditingId] = (0, react_1.useState)(null);
    // 使用外部组件状态或内部状态
    const components = externalComponents || internalComponents;
    const setComponents = setExternalComponents || setInternalComponents;
    // 类型安全的组件更新函数
    const updateComponents = (updater) => {
        if (setExternalComponents) {
            setExternalComponents(updater(components));
        }
        else {
            setInternalComponents(updater(components));
        }
    };
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
            updateComponents(cs => cs.map(c => c.id === componentId ? Object.assign(Object.assign({}, c), { x, y }) : c));
            // 同步更新选中的组件
            if (onComponentSelect) {
                const updatedComponent = components.find(c => c.id === componentId);
                if (updatedComponent) {
                    onComponentSelect(Object.assign(Object.assign({}, updatedComponent), { x, y }));
                }
            }
        }
        else {
            // 添加新组件
            const newComponent = {
                id: Date.now() + '-' + Math.random(),
                type,
                label: label || type,
                x,
                y,
                style: type === 'button' ? {
                    backgroundColor: '#f5f5f5',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                } : {}
            };
            updateComponents(cs => [...cs, newComponent]);
            // 自动选择新添加的组件
            if (onComponentSelect) {
                onComponentSelect(newComponent);
            }
        }
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const handleTextEdit = (id, newText) => {
        updateComponents(cs => cs.map(c => c.id === id ? Object.assign(Object.assign({}, c), { label: newText }) : c));
        setEditingId(null);
    };
    const handleTextClick = (id) => {
        setEditingId(id);
    };
    const handleComponentClick = (component) => {
        if (onComponentSelect) {
            onComponentSelect(component);
        }
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
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }, children: [projectName && projectDir && ((0, jsx_runtime_1.jsx)("button", { onClick: handleSaveProject, style: {
                    position: 'absolute',
                    top: 16,
                    right: 16,
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
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                }, onDrop: onDrop, onDragOver: onDragOver, children: components.map(c => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    return ((0, jsx_runtime_1.jsx)("div", { draggable: true, onDragStart: (e) => handleComponentDragStart(e, c), onClick: () => handleComponentClick(c), style: Object.assign({ position: 'absolute', left: c.x, top: c.y, border: (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === c.id ? '2px solid #3b82f6' : '2px solid transparent' }, (c.type === 'text' ? {
                            color: ((_a = c.style) === null || _a === void 0 ? void 0 : _a.color) || '#333',
                            fontSize: ((_b = c.style) === null || _b === void 0 ? void 0 : _b.fontSize) || '14px',
                            cursor: editingId === c.id ? 'text' : 'pointer',
                            backgroundColor: ((_c = c.style) === null || _c === void 0 ? void 0 : _c.backgroundColor) || 'transparent',
                            padding: ((_d = c.style) === null || _d === void 0 ? void 0 : _d.padding) || '0',
                            borderRadius: ((_e = c.style) === null || _e === void 0 ? void 0 : _e.borderRadius) || '0'
                        } : {
                            // 按钮组件：有外框背景
                            cursor: 'grab',
                            margin: '8px 0',
                            padding: ((_f = c.style) === null || _f === void 0 ? void 0 : _f.padding) || '8px 12px',
                            background: ((_g = c.style) === null || _g === void 0 ? void 0 : _g.backgroundColor) || '#f5f5f5',
                            borderRadius: ((_h = c.style) === null || _h === void 0 ? void 0 : _h.borderRadius) || '4px',
                            textAlign: 'center',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            minWidth: 60,
                            color: ((_j = c.style) === null || _j === void 0 ? void 0 : _j.color) || '#333',
                            fontSize: ((_k = c.style) === null || _k === void 0 ? void 0 : _k.fontSize) || '14px'
                        })), children: c.type === 'text' && editingId === c.id ? ((0, jsx_runtime_1.jsx)("input", { type: "text", value: c.label, onChange: (e) => {
                                updateComponents(cs => cs.map(comp => comp.id === c.id ? Object.assign(Object.assign({}, comp), { label: e.target.value }) : comp));
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
                            }, autoFocus: true })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => c.type === 'text' && handleTextClick(c.id), children: c.label })) }, c.id));
                }) })] }));
};
exports.default = Canvas;
