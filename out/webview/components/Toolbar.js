"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Toolbar = ({ projectName, showCode, onShowCodeChange }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            height: 50,
            background: '#2c3e50',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            borderBottom: '1px solid #34495e'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { marginRight: 24 }, children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: 14, fontWeight: 500 }, children: ["\u9879\u76EE: ", projectName] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => onShowCodeChange(!showCode), style: {
                    padding: '6px 12px',
                    background: showCode ? '#e74c3c' : 'transparent',
                    border: '1px solid #34495e',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: 12,
                    marginRight: 16
                }, children: showCode ? '隐藏代码' : '显示代码' }), (0, jsx_runtime_1.jsx)("button", { style: {
                    padding: '6px 16px',
                    background: '#27ae60',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: 12,
                    borderRadius: 4
                }, children: "\u4FDD\u5B58" })] }));
};
exports.default = Toolbar;
