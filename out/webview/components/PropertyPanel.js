"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PropertyPanel = ({ selectedComponent, onComponentUpdate, showCode }) => {
    var _a, _b, _c, _d;
    const [activeTab, setActiveTab] = (0, react_1.useState)('properties');
    const generateCode = () => {
        if (!selectedComponent)
            return '';
        const { type, label, style } = selectedComponent;
        switch (type) {
            case 'text':
                return `<div style="${Object.entries(style || {}).map(([key, value]) => `${key}: ${value}`).join('; ')}">${label}</div>`;
            case 'button':
                return `<button style="${Object.entries(style || {}).map(([key, value]) => `${key}: ${value}`).join('; ')}">${label}</button>`;
            default:
                return `<!-- ${type} component -->`;
        }
    };
    const updateComponentProperty = (property, value) => {
        if (!selectedComponent)
            return;
        const updatedComponent = Object.assign(Object.assign({}, selectedComponent), { [property]: value });
        onComponentUpdate(updatedComponent);
    };
    const updateComponentStyle = (property, value) => {
        if (!selectedComponent)
            return;
        const updatedComponent = Object.assign(Object.assign({}, selectedComponent), { style: Object.assign(Object.assign({}, selectedComponent.style), { [property]: value }) });
        onComponentUpdate(updatedComponent);
    };
    if (!selectedComponent) {
        return ((0, jsx_runtime_1.jsx)("div", { style: {
                width: 300,
                background: '#f8f9fa',
                borderLeft: '1px solid #e0e0e0'
            }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: 14
                }, children: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u7EC4\u4EF6\u6765\u7F16\u8F91\u5C5E\u6027" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: 300,
            background: '#f8f9fa',
            borderLeft: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    borderBottom: '1px solid #e0e0e0'
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('properties'), style: {
                            flex: 1,
                            padding: '12px',
                            background: activeTab === 'properties' ? '#fff' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: activeTab === 'properties' ? 600 : 400
                        }, children: "\u5C5E\u6027" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('styles'), style: {
                            flex: 1,
                            padding: '12px',
                            background: activeTab === 'styles' ? '#fff' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: activeTab === 'styles' ? 600 : 400
                        }, children: "\u6837\u5F0F" }), showCode && ((0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('code'), style: {
                            flex: 1,
                            padding: '12px',
                            background: activeTab === 'code' ? '#fff' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: activeTab === 'code' ? 600 : 400
                        }, children: "\u4EE3\u7801" }))] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, padding: '16px', overflow: 'auto' }, children: [activeTab === 'properties' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u7EC4\u4EF6\u7C7B\u578B" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: selectedComponent.type, disabled: true, style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12,
                                            background: '#f5f5f5'
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u6587\u672C\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: selectedComponent.label || '', onChange: (e) => updateComponentProperty('label', e.target.value), style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u4F4D\u7F6E X" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: selectedComponent.x || 0, onChange: (e) => updateComponentProperty('x', parseInt(e.target.value) || 0), style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u4F4D\u7F6E Y" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: selectedComponent.y || 0, onChange: (e) => updateComponentProperty('y', parseInt(e.target.value) || 0), style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12
                                        } })] })] })), activeTab === 'styles' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u80CC\u666F\u989C\u8272" }), (0, jsx_runtime_1.jsx)("input", { type: "color", value: ((_a = selectedComponent.style) === null || _a === void 0 ? void 0 : _a.backgroundColor) || '#ffffff', onChange: (e) => updateComponentStyle('backgroundColor', e.target.value), style: {
                                            width: '100%',
                                            height: 32,
                                            border: '1px solid #ddd',
                                            borderRadius: 4
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u6587\u5B57\u989C\u8272" }), (0, jsx_runtime_1.jsx)("input", { type: "color", value: ((_b = selectedComponent.style) === null || _b === void 0 ? void 0 : _b.color) || '#000000', onChange: (e) => updateComponentStyle('color', e.target.value), style: {
                                            width: '100%',
                                            height: 32,
                                            border: '1px solid #ddd',
                                            borderRadius: 4
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u5B57\u4F53\u5927\u5C0F" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: parseInt(((_c = selectedComponent.style) === null || _c === void 0 ? void 0 : _c.fontSize) || '14'), onChange: (e) => updateComponentStyle('fontSize', `${e.target.value}px`), style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12
                                        } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u8FB9\u6846\u5706\u89D2" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: parseInt(((_d = selectedComponent.style) === null || _d === void 0 ? void 0 : _d.borderRadius) || '0'), onChange: (e) => updateComponentStyle('borderRadius', `${e.target.value}px`), style: {
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            fontSize: 12
                                        } })] })] })), activeTab === 'code' && showCode && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 8 }, children: (0, jsx_runtime_1.jsx)("label", { style: { display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }, children: "\u751F\u6210\u7684\u4EE3\u7801" }) }), (0, jsx_runtime_1.jsx)("pre", { style: {
                                    background: '#2d3748',
                                    color: '#e2e8f0',
                                    padding: '12px',
                                    borderRadius: 4,
                                    fontSize: 11,
                                    overflow: 'auto',
                                    maxHeight: 200
                                }, children: generateCode() })] }))] })] }));
};
exports.default = PropertyPanel;
