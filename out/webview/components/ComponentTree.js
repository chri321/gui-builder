"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ComponentTree = ({ components, selectedComponent, onComponentSelect }) => {
    const getComponentIcon = (type) => {
        switch (type) {
            case 'text':
                return '📝';
            case 'button':
                return '🔘';
            case 'image':
                return '🖼️';
            case 'container':
                return '📦';
            default:
                return '📄';
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            flex: 1,
            borderTop: '1px solid #e0e0e0',
            background: '#f8f9fa'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    padding: '12px 16px',
                    borderBottom: '1px solid #e0e0e0',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#333'
                }, children: "\u7EC4\u4EF6\u6811" }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '8px 0' }, children: components.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: {
                        padding: '20px',
                        textAlign: 'center',
                        color: '#666',
                        fontSize: 12
                    }, children: "\u6682\u65E0\u7EC4\u4EF6" })) : (components.map((component, index) => ((0, jsx_runtime_1.jsxs)("div", { onClick: () => onComponentSelect(component), style: {
                        padding: '8px 16px',
                        cursor: 'pointer',
                        background: (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === component.id ? '#e3f2fd' : 'transparent',
                        borderLeft: (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === component.id ? '3px solid #2196f3' : '3px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 13
                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { marginRight: 8 }, children: getComponentIcon(component.type) }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 }, children: component.label || component.type }), (0, jsx_runtime_1.jsx)("span", { style: {
                                fontSize: 11,
                                color: '#666',
                                background: '#f0f0f0',
                                padding: '2px 6px',
                                borderRadius: 3
                            }, children: component.type })] }, component.id)))) })] }));
};
exports.default = ComponentTree;
