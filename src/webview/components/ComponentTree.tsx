import React from 'react';

interface ComponentTreeProps {
  components: any[];
  selectedComponent: any;
  onComponentSelect: (component: any) => void;
}

const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedComponent,
  onComponentSelect
}) => {
  const getComponentIcon = (type: string) => {
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

  return (
    <div style={{
      height: '100%',
      borderTop: '1px solid #e0e0e0',
      background: '#f8f9fa',
      overflow: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f8f9fa'
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 600,
        fontSize: 14,
        color: '#333'
      }}>
        组件树
      </div>
      
      <div style={{ padding: '8px 0' }}>
        {components.length === 0 ? (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#666',
            fontSize: 12
          }}>
            暂无组件
          </div>
        ) : (
          components.map((component, index) => (
            <div
              key={component.id}
              onClick={() => onComponentSelect(component)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                background: selectedComponent?.id === component.id ? '#e3f2fd' : 'transparent',
                borderLeft: selectedComponent?.id === component.id ? '3px solid #2196f3' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                fontSize: 13
              }}
            >
              <span style={{ marginRight: 8 }}>{getComponentIcon(component.type)}</span>
              <span style={{ flex: 1 }}>{component.label || component.type}</span>
              <span style={{ 
                fontSize: 11, 
                color: '#666',
                background: '#f0f0f0',
                padding: '2px 6px',
                borderRadius: 3
              }}>
                {component.type}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComponentTree; 