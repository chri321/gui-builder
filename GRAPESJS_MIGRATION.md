# 模仿 GrapesJS 的流程修改方案

## 概述

本文档描述了如何将当前的 GUI Builder 项目改造成类似 GrapesJS 的可视化网页构建器。

## GrapesJS 核心特性

### 1. 界面布局
- **顶部工具栏**: 项目信息、代码预览切换、保存按钮
- **左侧面板**: 组件库 + 组件树
- **中间画布**: 可视化编辑区域
- **右侧面板**: 属性编辑器

### 2. 核心功能
- **组件系统**: 丰富的组件库和自定义组件
- **拖拽编辑**: 直观的拖拽操作
- **属性面板**: 实时编辑组件属性
- **层级结构**: 组件树状结构管理
- **样式编辑**: 可视化样式编辑器
- **代码生成**: 自动生成 HTML/CSS/JS

## 已完成的修改

### 1. 界面重构 (`App.tsx`)
```typescript
// 新增状态管理
const [selectedComponent, setSelectedComponent] = useState<any>(null);
const [components, setComponents] = useState<any[]>([]);
const [showCode, setShowCode] = useState(false);
```

### 2. 工具栏组件 (`Toolbar.tsx`)
- 项目信息显示
- 代码预览切换
- 保存按钮

### 3. 组件库增强 (`ComponentPalette.tsx`)
- 按分类组织组件
- 网格布局显示
- 悬停动画效果
- 更多组件类型支持

### 4. 组件树 (`ComponentTree.tsx`)
- 显示画布中所有组件
- 组件选择功能
- 层级结构显示
- 组件类型图标

### 5. 属性面板 (`PropertyPanel.tsx`)
- 属性编辑（位置、文本等）
- 样式编辑（颜色、字体、边框等）
- 代码预览
- 标签页切换

### 6. 画布增强 (`Canvas.tsx`)
- 组件选择高亮
- 自动选择新组件
- 固定画布尺寸

## 下一步改进计划

### 1. 组件渲染系统
```typescript
// 需要为每种组件类型创建渲染器
const componentRenderers = {
  text: TextRenderer,
  button: ButtonRenderer,
  image: ImageRenderer,
  input: InputRenderer,
  // ...
};
```

### 2. 样式系统
```typescript
// 支持更多样式属性
interface ComponentStyle {
  // 布局
  position: 'static' | 'relative' | 'absolute' | 'fixed';
  display: 'block' | 'inline' | 'flex' | 'grid';
  
  // 尺寸
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  
  // 间距
  margin: string;
  padding: string;
  
  // 样式
  backgroundColor: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  
  // 边框
  border: string;
  borderRadius: string;
  boxShadow: string;
  
  // 其他
  opacity: number;
  transform: string;
  transition: string;
}
```

### 3. 代码生成器
```typescript
class CodeGenerator {
  generateHTML(components: Component[]): string {
    // 生成 HTML 代码
  }
  
  generateCSS(components: Component[]): string {
    // 生成 CSS 代码
  }
  
  generateJS(components: Component[]): string {
    // 生成 JavaScript 代码
  }
}
```

### 4. 历史记录系统
```typescript
class HistoryManager {
  private history: Component[][] = [];
  private currentIndex: number = -1;
  
  pushState(components: Component[]) {
    // 添加新状态
  }
  
  undo() {
    // 撤销操作
  }
  
  redo() {
    // 重做操作
  }
}
```

### 5. 模板系统
```typescript
interface Template {
  id: string;
  name: string;
  thumbnail: string;
  components: Component[];
  category: string;
}

class TemplateManager {
  getTemplates(): Template[] {
    // 获取模板列表
  }
  
  applyTemplate(template: Template) {
    // 应用模板
  }
}
```

## 技术栈建议

### 1. 状态管理
- 使用 Zustand 或 Redux Toolkit 进行状态管理
- 支持撤销/重做功能

### 2. 样式系统
- 使用 CSS-in-JS 或 Tailwind CSS
- 支持主题系统

### 3. 组件系统
- 使用 React 组件作为渲染器
- 支持自定义组件注册

### 4. 代码生成
- 使用 AST 操作生成代码
- 支持多种输出格式

## 文件结构建议

```
src/
├── components/
│   ├── Toolbar.tsx
│   ├── ComponentPalette.tsx
│   ├── ComponentTree.tsx
│   ├── PropertyPanel.tsx
│   └── Canvas.tsx
├── renderers/
│   ├── TextRenderer.tsx
│   ├── ButtonRenderer.tsx
│   ├── ImageRenderer.tsx
│   └── index.ts
├── systems/
│   ├── HistoryManager.ts
│   ├── CodeGenerator.ts
│   ├── StyleManager.ts
│   └── ComponentManager.ts
├── types/
│   ├── Component.ts
│   ├── Style.ts
│   └── Template.ts
└── utils/
    ├── dom.ts
    ├── style.ts
    └── code.ts
```

## 总结

通过以上修改，我们已经实现了 GrapesJS 的核心界面布局和基本功能。下一步需要：

1. 完善组件渲染系统
2. 增强样式编辑功能
3. 实现代码生成器
4. 添加历史记录功能
5. 支持模板系统
6. 优化用户体验

这将使项目成为一个功能完整的可视化网页构建器，类似于 GrapesJS 的功能和体验。 