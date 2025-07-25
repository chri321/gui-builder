import React, { useState } from 'react';

interface CanvasComponent {
  id: string;
  type: string;
  x: number;
  y: number;
}

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const [components, setComponents] = useState<CanvasComponent[]>([]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('component-type');
    if (!type) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setComponents(cs => [
      ...cs,
      { id: Date.now() + '-' + Math.random(), type, x, y }
    ]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        background: '#fff',
        border: '1px solid #bbb',
        borderRadius: 8,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        margin: 24
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {components.map(c => (
        <div
          key={c.id}
          style={{
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
          }}
        >
          {c.type === 'button' ? <button>按钮</button> : null}
          {c.type === 'text' ? <span>文本</span> : null}
        </div>
      ))}
    </div>
  );
};

export default Canvas; 