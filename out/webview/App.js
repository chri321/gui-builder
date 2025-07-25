"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ComponentPalette_1 = __importDefault(require("./components/ComponentPalette"));
const Canvas_1 = __importDefault(require("./editor/Canvas"));
const App = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', height: '100vh' }, children: [(0, jsx_runtime_1.jsx)(ComponentPalette_1.default, {}), (0, jsx_runtime_1.jsx)(Canvas_1.default, {})] }));
};
exports.default = App;
