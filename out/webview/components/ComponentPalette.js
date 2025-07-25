"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const components = [
    { type: 'button', label: '按钮' },
    { type: 'text', label: '文本' }
];
const ComponentPalette = () => {
    const onDragStart = (e, type) => {
        e.dataTransfer.setData('component-type', type);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { width: 120, borderRight: '1px solid #eee', padding: 12 }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u7EC4\u4EF6\u5E93" }), components.map(c => ((0, jsx_runtime_1.jsx)("div", { draggable: true, onDragStart: e => onDragStart(e, c.type), style: {
                    margin: '8px 0',
                    padding: '8px 12px',
                    background: '#f5f5f5',
                    borderRadius: 4,
                    cursor: 'grab',
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }, children: c.label }, c.type)))] }));
};
exports.default = ComponentPalette;
