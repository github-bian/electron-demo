# Electron + React 19 桌面应用项目

一个现代化的 Electron 桌面应用开发模板，集成了 React 19、Next.js、Tailwind CSS、Ant Design、Framer Motion 和 styled-components。

## 🚀 技术栈

- **Electron** - 跨平台桌面应用框架
- **React 19** - 最新版本的 React，支持并发渲染
- **Next.js 14** - React 框架，提供路由和优化
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Ant Design** - 企业级 UI 组件库
- **Framer Motion** - 强大的动画库
- **styled-components** - CSS-in-JS 解决方案
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📁 项目结构

```
electron-react-monorepo/
├── packages/
│   ├── main/              # Electron 主进程
│   │   ├── src/
│   │   │   ├── main.ts    # 主进程入口
│   │   │   ├── preload.ts # 预加载脚本
│   │   │   └── ipc.ts     # IPC 处理器
│   │   └── package.json
│   ├── renderer/          # 渲染进程（Next.js + React）
│   │   ├── src/
│   │   │   ├── app/       # Next.js App Router
│   │   │   ├── components/# React 组件
│   │   │   ├── providers/ # Context Providers
│   │   │   ├── lib/       # 工具库
│   │   │   ├── styles/    # 全局样式
│   │   │   └── types/     # 类型定义
│   │   └── package.json
│   └── shared/            # 共享代码
│       ├── src/
│       │   ├── types.ts   # 共享类型
│       │   └── constants.ts # 常量
│       └── package.json
├── package.json           # 根 package.json
├── pnpm-workspace.yaml    # pnpm workspace 配置
└── tsconfig.json          # TypeScript 配置
```

## 🛠️ 开发指南

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动开发服务器（同时运行 renderer 和 main 进程）：

```bash
pnpm dev
```

这会：
1. 在 `http://localhost:3000` 启动 Next.js 开发服务器
2. 启动 Electron 应用并加载开发服务器

### 构建生产版本

```bash
# 构建所有包
pnpm build

# 打包 Electron 应用
pnpm package
```

### 其他命令

```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 清理构建产物
pnpm clean
```

## 📦 包说明

### @electron-react-monorepo/main

Electron 主进程包，负责：
- 创建和管理应用窗口
- 处理系统级操作
- IPC 通信
- 应用生命周期管理

### @electron-react-monorepo/renderer

渲染进程包，基于 Next.js，包含：
- React 19 组件
- Tailwind CSS 样式
- Ant Design UI 组件
- Framer Motion 动画
- styled-components 样式

### @electron-react-monorepo/shared

共享代码包，包含：
- TypeScript 类型定义
- 常量定义
- 工具函数

## 🎨 架构特性

### Monorepo 架构

使用 pnpm workspace 实现 Monorepo，优势：
- 代码共享更容易
- 依赖管理更高效
- 统一的构建和测试流程

### IPC 通信

使用类型安全的 IPC 通信：
- 预加载脚本暴露安全的 API
- 主进程和渲染进程通过 IPC 通道通信
- 所有通道名称在 shared 包中定义

### 样式方案

多种样式方案并存：
- **Tailwind CSS** - 快速构建布局
- **Ant Design** - 企业级组件
- **styled-components** - 组件级样式隔离

### 动画

使用 Framer Motion 实现流畅动画：
- 页面过渡动画
- 交互动画
- 手势支持

## 🔧 配置说明

### TypeScript 配置

项目使用 TypeScript Project References 实现增量编译：
- 根目录的 `tsconfig.json` 作为基础配置
- 每个包有自己的 `tsconfig.json`
- 包之间通过 `references` 建立依赖关系

### Next.js 配置

`packages/renderer/next.config.js` 配置：
- `output: 'export'` - 导出静态 HTML
- `images.unoptimized` - 禁用图片优化（Electron 环境）
- `styledComponents: true` - 启用 styled-components 编译

### Electron 配置

`packages/main/package.json` 中的 `build` 字段配置打包选项：
- 支持 macOS、Windows、Linux
- 配置应用图标、名称等
- 自定义打包输出

## 📚 学习资源

### 核心概念

1. **Electron 进程模型**
   - 主进程：管理应用生命周期和原生 API
   - 渲染进程：运行 Web 页面
   - 预加载脚本：在渲染进程中访问 Node.js API

2. **Next.js App Router**
   - 基于文件系统的路由
   - 服务端组件和客户端组件
   - 布局和模板

3. **React 19 新特性**
   - 并发渲染
   - 自动批处理
   - Transitions

### 示例代码

#### 使用 IPC 通信

渲染进程调用主进程 API：

```typescript
// 获取应用版本
const version = await window.electronAPI.getVersion();

// 最小化窗口
await window.electronAPI.minimizeWindow();
```

#### 创建动画组件

```typescript
import { motion } from 'framer-motion';

function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>Content</Card>
    </motion.div>
  );
}
```

#### 使用 styled-components

```typescript
import styled from 'styled-components';

const Button = styled.button`
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  
  &:hover {
    background: #5568d3;
  }
`;
```

## 🐛 常见问题

### 问题：Electron 窗口显示空白

确保 Next.js 开发服务器已启动（`http://localhost:3000`）

### 问题：IPC 通信失败

检查 preload 脚本是否正确加载，查看控制台错误信息

### 问题：样式不生效

确保 Tailwind CSS 的 `content` 配置包含了所有组件文件

## 📝 开发建议

1. **代码组织**
   - 将可复用的逻辑提取到 shared 包
   - 使用 TypeScript 接口定义数据结构
   - 组件按功能分类组织

2. **性能优化**
   - 使用 React.memo 避免不必要的重渲染
   - 懒加载大型组件
   - 优化 Electron 窗口加载速度

3. **安全性**
   - 启用 contextIsolation
   - 使用 preload 脚本暴露 API
   - 验证所有 IPC 输入

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你开发愉快！** 🎉
