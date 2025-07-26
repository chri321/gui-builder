import React, { useState } from 'react';

interface PropertyPanelProps {
  selectedComponent: any;
  onComponentUpdate: (component: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponent,
  onComponentUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'styles'>('properties');



  const updateComponentProperty = (property: string, value: any) => {
    if (!selectedComponent) return;
    
    const updatedComponent = {
      ...selectedComponent,
      [property]: value
    };
    onComponentUpdate(updatedComponent);
  };

  const updateComponentStyle = (property: string, value: string) => {
    if (!selectedComponent) return;
    
    const updatedComponent = {
      ...selectedComponent,
      style: {
        ...selectedComponent.style,
        [property]: value
      }
    };
    onComponentUpdate(updatedComponent);
  };

  if (!selectedComponent) {
    return (
      <div style={{
        width: 300,
        background: '#f8f9fa',
        borderLeft: '1px solid #e0e0e0'
      }}>
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#666',
          fontSize: 14
        }}>
          请选择一个组件来编辑属性
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: 300,
      background: '#f8f9fa',
      borderLeft: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 标签页 */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <button
          onClick={() => setActiveTab('properties')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'properties' ? '#fff' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: activeTab === 'properties' ? 600 : 400
          }}
        >
          属性
        </button>
        <button
          onClick={() => setActiveTab('styles')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'styles' ? '#fff' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: activeTab === 'styles' ? 600 : 400
          }}
        >
          样式
        </button>

      </div>

      {/* 内容区域 */}
      <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
        {activeTab === 'properties' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                组件类型
              </label>
              <input
                type="text"
                value={selectedComponent.type}
                disabled
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12,
                  background: '#f5f5f5'
                }}
              />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                文本内容
              </label>
              <input
                type="text"
                value={selectedComponent.label || ''}
                onChange={(e) => updateComponentProperty('label', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                位置 X
              </label>
              <input
                type="number"
                value={selectedComponent.x || 0}
                onChange={(e) => updateComponentProperty('x', parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                位置 Y
              </label>
              <input
                type="number"
                value={selectedComponent.y || 0}
                onChange={(e) => updateComponentProperty('y', parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'styles' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                背景颜色
              </label>
              <input
                type="color"
                value={selectedComponent.style?.backgroundColor || '#ffffff'}
                onChange={(e) => updateComponentStyle('backgroundColor', e.target.value)}
                style={{
                  width: '100%',
                  height: 32,
                  border: '1px solid #ddd',
                  borderRadius: 4
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                文字颜色
              </label>
              <input
                type="color"
                value={selectedComponent.style?.color || '#000000'}
                onChange={(e) => updateComponentStyle('color', e.target.value)}
                style={{
                  width: '100%',
                  height: 32,
                  border: '1px solid #ddd',
                  borderRadius: 4
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                字体大小
              </label>
              <input
                type="number"
                value={parseInt(selectedComponent.style?.fontSize || '14')}
                onChange={(e) => updateComponentStyle('fontSize', `${e.target.value}px`)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
                边框圆角
              </label>
              <input
                type="number"
                value={parseInt(selectedComponent.style?.borderRadius || '0')}
                onChange={(e) => updateComponentStyle('borderRadius', `${e.target.value}px`)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default PropertyPanel; 