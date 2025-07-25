"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Canvas = () => {
    const [components, setComponents] = (0, react_1.useState)([]);
    const onDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('component-type');
        if (!type)
            return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setComponents(cs => [
            ...cs,
            { id: Date.now() + '-' + Math.random(), type, x, y }
        ]);
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    return ((0, jsx_runtime_1.jsx)("div", { style: { flex: 1, position: 'relative', background: '#fafbfc', minHeight: 500 }, onDrop: onDrop, onDragOver: onDragOver, children: components.map(c => ((0, jsx_runtime_1.jsxs)("div", { style: {
                position: 'absolute',
                left: c.x,
                top: c.y,
                padding: 8,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: 4,
                minWidth: 60,
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
            }, children: [c.type === 'button' ? (0, jsx_runtime_1.jsx)("button", { children: "\u6309\u94AE" }) : null, c.type === 'text' ? (0, jsx_runtime_1.jsx)("span", { children: "\u6587\u672C" }) : null] }, c.id))) }));
};
exports.default = Canvas;
