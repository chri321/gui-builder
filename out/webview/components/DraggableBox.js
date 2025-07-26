"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DraggableBox = () => {
    const [position, setPosition] = (0, react_1.useState)({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const offsetRef = (0, react_1.useRef)({ x: 0, y: 0 });
    const handleMouseDown = (e) => {
        setIsDragging(true);
        offsetRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };
    (0, react_1.useEffect)(() => {
        const handleMouseMove = (e) => {
            if (!isDragging)
                return;
            setPosition({
                x: e.clientX - offsetRef.current.x,
                y: e.clientY - offsetRef.current.y
            });
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: 120,
            height: 80,
            background: isDragging ? '#4a9cff' : '#f0f0f0',
            cursor: 'move',
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '2px solid #d0d0d0',
            transition: 'background 0.2s ease',
            zIndex: isDragging ? 10 : 1
        }, onMouseDown: handleMouseDown, children: isDragging ? '释放鼠标放置' : '拖拽我' }));
};
exports.default = DraggableBox;
