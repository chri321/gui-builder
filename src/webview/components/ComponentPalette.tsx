import React from 'react';

const components = [
  { type: 'button', label: '按钮' },
  { type: 'text', label: '文本' }
];

const ComponentPalette: React.FC = () => {
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('component-type', type);
  };

  return (
    <div style={{ width: 120, borderRight: '1px solid #eee', padding: 12 }}>
      <h4>组件库</h4>
      {components.map(c => (
        <div
          key={c.type}
          draggable
          onDragStart={e => onDragStart(e, c.type)}
          style={{
            margin: '8px 0',
            padding: '8px 12px',
            background: '#f5f5f5',
            borderRadius: 4,
            cursor: 'grab',
            textAlign: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          {c.label}
        </div>
      ))}
    </div>
  );
};

export default ComponentPalette; 