import React from 'react';

interface ToolbarProps {
  projectName: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  projectName
}) => {
  return (
    <div style={{
      height: 50,
      background: '#2c3e50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      borderBottom: '1px solid #34495e'
    }}>
      {/* 项目信息 */}
      <div style={{ marginRight: 24 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>项目: {projectName}</span>
      </div>



      {/* 保存按钮 */}
      <button
        style={{
          padding: '6px 16px',
          background: '#27ae60',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: 12,
          borderRadius: 4
        }}
      >
        保存
      </button>
    </div>
  );
};

export default Toolbar; 