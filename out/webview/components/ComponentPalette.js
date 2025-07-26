"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const components = [
    { type: 'text', label: '文本', icon: '📝', category: '基础' },
    { type: 'button', label: '按钮', icon: '🔘', category: '基础' },
    { type: 'image', label: '图片', icon: '🖼️', category: '媒体' },
    { type: 'container', label: '容器', icon: '📦', category: '布局' },
    { type: 'input', label: '输入框', icon: '📝', category: '表单' },
    { type: 'textarea', label: '文本域', icon: '📄', category: '表单' },
    { type: 'select', label: '下拉框', icon: '📋', category: '表单' },
    { type: 'checkbox', label: '复选框', icon: '☑️', category: '表单' },
    { type: 'radio', label: '单选框', icon: '🔘', category: '表单' },
    { type: 'link', label: '链接', icon: '🔗', category: '导航' },
    { type: 'divider', label: '分割线', icon: '➖', category: '布局' },
    { type: 'icon', label: '图标', icon: '⭐', category: '基础' }
];
const ComponentPalette = () => {
    const onDragStart = (e, type, label) => {
        e.dataTransfer.setData('component-type', type);
        e.dataTransfer.setData('component-label', label);
    };
    // 按分类组织组件
    const groupedComponents = components.reduce((acc, component) => {
        if (!acc[component.category]) {
            acc[component.category] = [];
        }
        acc[component.category].push(component);
        return acc;
    }, {});
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: 280,
            borderRight: '1px solid #e0e0e0',
            background: '#f8f9fa',
            overflow: 'auto'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    background: '#fff'
                }, children: (0, jsx_runtime_1.jsx)("h4", { style: { margin: 0, fontSize: 16, fontWeight: 600, color: '#333' }, children: "\u7EC4\u4EF6\u5E93" }) }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '12px' }, children: Object.entries(groupedComponents).map(([category, categoryComponents]) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '20px' }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                fontSize: 12,
                                fontWeight: 600,
                                color: '#666',
                                marginBottom: '8px',
                                padding: '4px 8px',
                                background: '#e9ecef',
                                borderRadius: '4px'
                            }, children: category }), (0, jsx_runtime_1.jsx)("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px'
                            }, children: categoryComponents.map(c => ((0, jsx_runtime_1.jsxs)("div", { draggable: true, onDragStart: e => onDragStart(e, c.type, c.label), style: {
                                    padding: '12px 8px',
                                    background: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    cursor: 'grab',
                                    textAlign: 'center',
                                    fontSize: 12,
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px'
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '18px' }, children: c.icon }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 500, color: '#333' }, children: c.label })] }, c.type))) })] }, category))) })] }));
};
exports.default = ComponentPalette;
