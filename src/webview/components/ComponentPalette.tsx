import React, { useState } from 'react';

// 自定义SVG图标组件
const TextIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.5 4v3h5v12h3V7h5V4H2.5zM21.5 9h-9v3h3v7h3v-7h3V9z"/>
  </svg>
);

const ButtonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const ContainerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
  </svg>
);

const InputIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
  </svg>
);

const TextareaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const SelectIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const CheckboxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const RadioIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
  </svg>
);

const DividerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const IconIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// 折叠/展开图标
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

const components = [
  { type: 'text', label: 'Text', icon: TextIcon, category: 'Basic' },
  { type: 'button', label: 'Button', icon: ButtonIcon, category: 'Basic' },
  { type: 'image', label: 'Image', icon: ImageIcon, category: 'Media' },
  { type: 'container', label: 'Container', icon: ContainerIcon, category: 'Layout' },
  { type: 'input', label: 'Input', icon: InputIcon, category: 'Form' },
  { type: 'textarea', label: 'Textarea', icon: TextareaIcon, category: 'Form' },
  { type: 'select', label: 'Select', icon: SelectIcon, category: 'Form' },
  { type: 'checkbox', label: 'Checkbox', icon: CheckboxIcon, category: 'Form' },
  { type: 'radio', label: 'Radio', icon: RadioIcon, category: 'Form' },
  { type: 'link', label: 'Link', icon: LinkIcon, category: 'Navigation' },
  { type: 'divider', label: 'Divider', icon: DividerIcon, category: 'Layout' },
  { type: 'icon', label: 'Icon', icon: IconIcon, category: 'Basic' }
];

const ComponentPalette: React.FC = () => {
  // 折叠状态管理
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const onDragStart = (e: React.DragEvent, type: string, label: string) => {
    e.dataTransfer.setData('component-type', type);
    e.dataTransfer.setData('component-label', label);
  };

  // 切换分类折叠状态
  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // 按分类组织组件
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div style={{ 
      height: '100%',
      background: '#f8f9fa',
      overflow: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f8f9fa'
    }}>
      <div style={{
        padding: '8px',
        borderBottom: '1px solid #e0e0e0',
        background: '#fff'
      }}>
        <h4 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#333' }}>Blocks</h4>
      </div>
      
      <div style={{ padding: '6px' }}>
        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <div key={category} style={{ marginBottom: '0px' }}>
            <div 
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#666',
                marginBottom: '1px',
                padding: '3px 3px',
                background: '#e9ecef',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none'
              }}
              onClick={() => toggleCategory(category)}
            >
              <span>{category}</span>
              <span style={{ 
                color: '#999',
                transition: 'transform 0.2s ease',
                transform: collapsedCategories[category] ? 'rotate(-90deg)' : 'rotate(0deg)'
              }}>
                <ChevronDownIcon />
              </span>
            </div>
            
            {!collapsedCategories[category] && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '6px'
              }}>
                {categoryComponents.map(c => (
                  <div
                    key={c.type}
                    draggable
                    onDragStart={e => onDragStart(e, c.type, c.label)}
                    style={{
                      padding: '8px 6px',
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      cursor: 'grab',
                      textAlign: 'center',
                      fontSize: 11,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0px'
                    }}
                  >
                    <span style={{ color: '#666', flexShrink: 0, display: 'block', lineHeight: 1 }}>
                      <c.icon />
                    </span>
                    <span style={{ fontWeight: 500, color: '#333', fontSize: 10, lineHeight: 1, marginTop: '-2px' }}>{c.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette; 