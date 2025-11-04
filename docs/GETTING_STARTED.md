# 快速开始指南

本指南将帮助你快速上手这个 Electron + React 19 项目。

## 📋 第一步：安装

### 1. 安装 Node.js 和 pnpm

确保你已安装：
- Node.js 18 或更高版本
- pnpm 8 或更高版本

如果没有安装 pnpm，可以通过以下命令安装：

```bash
npm install -g pnpm
```

### 2. 安装项目依赖

在项目根目录运行：

```bash
pnpm install
```

这会安装所有包的依赖。

## 🚀 第二步：启动开发环境

运行开发命令：

```bash
pnpm dev
```

这会同时启动：
1. Next.js 开发服务器（端口 3000）
2. Electron 应用窗口

你应该会看到一个漂亮的 Electron 窗口，显示欢迎页面。

## 🎨 第三步：开始开发

### 修改渲染进程（前端）

编辑 `packages/renderer/src/app/page.tsx`：

```typescript
// 尝试修改标题
<Title level={1}>
  🎉 我的第一个 Electron 应用
</Title>
```

保存后，页面会自动刷新（热重载）。

### 添加新页面

在 `packages/renderer/src/app` 中创建新目录：

```bash
mkdir packages/renderer/src/app/about
```

创建 `packages/renderer/src/app/about/page.tsx`：

```typescript
'use client';

import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div className="p-8">
      <Title>关于页面</Title>
      <Paragraph>这是一个新页面！</Paragraph>
    </div>
  );
}
```

访问 `http://localhost:3000/about` 查看新页面。

### 创建自定义组件

在 `packages/renderer/src/components` 创建新组件：

```typescript
// packages/renderer/src/components/Counter.tsx
'use client';

import React, { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CounterContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <CounterContainer>
      <Space direction="vertical" size="large">
        <motion.div
          key={count}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography.Title level={2}>{count}</Typography.Title>
        </motion.div>
        <Space>
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <Button type="primary" onClick={() => setCount(count + 1)}>+</Button>
        </Space>
      </Space>
    </CounterContainer>
  );
}
```

在页面中使用：

```typescript
import Counter from '@/components/Counter';

// 在你的页面组件中
<Counter />
```

## 🔌 第四步：使用 Electron API

### 调用主进程功能

在渲染进程中使用 Electron API：

```typescript
'use client';

import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

export default function ElectronExample() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    // 获取应用版本
    if (window.electronAPI) {
      window.electronAPI.getVersion().then(setVersion);
    }
  }, []);

  const handleShowDialog = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.showMessageBox({
        type: 'info',
        title: '提示',
        message: '这是一个 Electron 对话框！',
        buttons: ['确定', '取消']
      });
      message.info(`你点击了：${result.response === 0 ? '确定' : '取消'}`);
    }
  };

  return (
    <div>
      <p>应用版本：{version}</p>
      <Button onClick={handleShowDialog}>显示对话框</Button>
    </div>
  );
}
```

### 添加新的 IPC 功能

1. 在 `packages/shared/src/constants.ts` 添加通道名称：

```typescript
export const IPC_CHANNELS = {
  // ... 现有代码
  CUSTOM: {
    HELLO: 'custom:hello',
  },
};
```

2. 在 `packages/main/src/ipc.ts` 添加处理器：

```typescript
ipcMain.handle(IPC_CHANNELS.CUSTOM.HELLO, (_, name: string) => {
  return `Hello, ${name}!`;
});
```

3. 在 `packages/main/src/preload.ts` 暴露 API：

```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  // ... 现有代码
  sayHello: (name: string) => ipcRenderer.invoke(IPC_CHANNELS.CUSTOM.HELLO, name),
});
```

4. 在渲染进程使用：

```typescript
const greeting = await window.electronAPI.sayHello('世界');
console.log(greeting); // "Hello, 世界!"
```

## 🎨 第五步：样式定制

### 使用 Tailwind CSS

```typescript
<div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello Tailwind!</h1>
</div>
```

### 使用 Ant Design

```typescript
import { Button, Card, Space, Tag } from 'antd';

<Card title="我的卡片" extra={<Tag color="blue">标签</Tag>}>
  <Space>
    <Button type="primary">主要按钮</Button>
    <Button>默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
  </Space>
</Card>
```

### 使用 styled-components

```typescript
import styled from 'styled-components';

const GradientButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

### 使用 Framer Motion

```typescript
import { motion } from 'framer-motion';

// 淡入动画
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>

// 滑入动画
<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 100 }}
>
  内容
</motion.div>

// 悬停动画
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  按钮
</motion.button>
```

## 📦 第六步：构建和打包

### 构建项目

```bash
pnpm build
```

这会构建所有包。

### 打包应用

```bash
pnpm package
```

打包后的应用会在 `packages/main/release` 目录中。

## 🐛 调试技巧

### 1. 打开开发者工具

开发模式下自动打开，或在代码中：

```typescript
// packages/main/src/main.ts
mainWindow.webContents.openDevTools();
```

### 2. 查看主进程日志

主进程的 `console.log` 会输出到终端。

### 3. 查看渲染进程日志

渲染进程的 `console.log` 会输出到开发者工具控制台。

## 📚 下一步

- 阅读 [完整文档](./README.md)
- 查看 [架构说明](./docs/ARCHITECTURE.md)
- 学习 [最佳实践](./docs/BEST_PRACTICES.md)

## ❓ 遇到问题？

- 查看 [常见问题](./README.md#常见问题)
- 确保所有依赖都已正确安装
- 检查 Node.js 和 pnpm 版本

---

**开始你的 Electron 开发之旅吧！** 🚀
