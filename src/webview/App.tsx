import React, { useState } from 'react';
import ComponentPalette from './components/ComponentPalette';
import Canvas from './editor/Canvas';

type Resolution = { label: string; width: number; height: number };

const resolutions: Resolution[] = [
  { label: '240x240', width: 240, height: 240 },
  { label: '390x390', width: 390, height: 390 },
  { label: '454x454', width: 454, height: 454 },
  { label: '自定义', width: 320, height: 320 }
];

const App: React.FC = () => {
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [selectLabel, setSelectLabel] = useState(resolutions[0].label);
  const [custom, setCustom] = useState({ width: 320, height: 320 });
  const [projectName, setProjectName] = useState('');
  const [projectDir, setProjectDir] = useState('');

  if (!resolution) {
    const selected = resolutions.find(r => r.label === selectLabel) || resolutions[0];
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#e5e7ea' }}>
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 400 }}>
          <h2 style={{ marginBottom: 24 }}>新建项目</h2>
          {/* 项目名称 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>项目名称</label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="请输入项目名称"
              style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          {/* 项目目录 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>项目目录</label>
            <input
              type="text"
              value={projectDir}
              onChange={e => setProjectDir(e.target.value)}
              placeholder="请输入项目文件夹路径"
              style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          {/* 分辨率设置 */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>屏幕分辨率</label>
            <select
              value={selectLabel}
              onChange={e => setSelectLabel(e.target.value)}
              style={{ fontSize: 15, padding: 8, minWidth: 120 }}
            >
              {resolutions.map(r => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>
            {selectLabel === '自定义' && (
              <span style={{ marginLeft: 16 }}>
                宽：<input
                  type="number"
                  value={custom.width}
                  min={100}
                  max={1000}
                  onChange={e => setCustom({ ...custom, width: Number(e.target.value) })}
                  style={{ width: 60, marginRight: 12 }}
                />
                高：<input
                  type="number"
                  value={custom.height}
                  min={100}
                  max={1000}
                  onChange={e => setCustom({ ...custom, height: Number(e.target.value) })}
                  style={{ width: 60 }}
                />
              </span>
            )}
          </div>
          <button
            style={{ marginTop: 12, padding: '8px 32px', fontSize: 16 }}
            disabled={!projectName || !projectDir}
            onClick={() => {
              if (selectLabel === '自定义') {
                setResolution({ label: '自定义', width: custom.width, height: custom.height });
              } else {
                setResolution(selected);
              }
            }}
          >
            创建画布
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ComponentPalette />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 12, borderBottom: '1px solid #eee', background: '#f7f7f7' }}>
          <span>项目名称：</span>
          <span style={{ marginRight: 24, fontWeight: 500 }}>{projectName}</span>
          <span>项目目录：</span>
          <span style={{ marginRight: 24, fontWeight: 500 }}>{projectDir}</span>
          <span>屏幕分辨率：</span>
          <span style={{ marginLeft: 8, fontWeight: 500 }}>{resolution.label}（{resolution.width} x {resolution.height}）</span>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e5e7ea' }}>
          <Canvas width={resolution.width} height={resolution.height} />
        </div>
      </div>
    </div>
  );
};

export default App; 