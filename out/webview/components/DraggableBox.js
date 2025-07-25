"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DraggableBox = () => {
    const boxRef = (0, react_1.useRef)(null);
    const [pos, setPos] = (0, react_1.useState)({ x: 100, y: 100 });
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const [offset, setOffset] = (0, react_1.useState)({ x: 0, y: 0 });
    const onMouseDown = (e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        });
    };
    const onMouseMove = (e) => {
        if (!dragging)
            return;
        setPos({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };
    const onMouseUp = () => {
        setDragging(false);
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: boxRef, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, onMouseLeave: onMouseUp, style: {
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: 120,
            height: 60,
            background: dragging ? '#69f' : '#ccc',
            color: '#222',
            cursor: 'move',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }, children: "\u62D6\u62FD\u6211" }));
};
exports.default = DraggableBox;
