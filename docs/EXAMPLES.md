# 示例代码

本目录包含了一些实用的示例代码，帮助你快速理解如何使用项目中的各种技术。

## 📁 目录

- [基础组件示例](#基础组件示例)
- [IPC 通信示例](#ipc-通信示例)
- [动画示例](#动画示例)
- [表单示例](#表单示例)
- [数据获取示例](#数据获取示例)

## 基础组件示例

### 卡片组件

```typescript
// components/Card.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <CardContainer
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </CardContainer>
  );
}
```

### 按钮组件

```typescript
// components/Button.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  padding: ${props => 
    props.size === 'small' ? '0.25rem 0.5rem' :
    props.size === 'large' ? '0.75rem 1.5rem' :
    '0.5rem 1rem'
  };
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  background: ${props => 
    props.variant === 'danger' ? '#ef4444' :
    props.variant === 'secondary' ? '#6b7280' :
    '#667eea'
  };
  
  color: white;
  
  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.9};
  }
`;

export default function Button({ 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  children, 
  disabled = false 
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </StyledButton>
  );
}
```

## IPC 通信示例

### 文件选择器

```typescript
// components/FileSelector.tsx
'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

export default function FileSelector() {
  const [selectedPath, setSelectedPath] = useState<string>('');

  const handleSelectFile = async () => {
    if (!window.electronAPI) {
      message.error('Electron API 不可用');
      return;
    }

    try {
      const result = await window.electronAPI.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (!result.canceled && result.filePaths.length > 0) {
        setSelectedPath(result.filePaths[0]);
        message.success('文件选择成功！');
      }
    } catch (error) {
      message.error('文件选择失败');
      console.error(error);
    }
  };

  return (
    <div>
      <Button 
        icon={<FolderOpenOutlined />} 
        onClick={handleSelectFile}
      >
        选择文件
      </Button>
      {selectedPath && (
        <p className="mt-2 text-sm text-gray-600">
          已选择: {selectedPath}
        </p>
      )}
    </div>
  );
}
```

### 应用信息显示

```typescript
// components/AppInfo.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, Descriptions } from 'antd';

interface AppInfo {
  version: string;
  platform: string;
  dataPath: string;
}

export default function AppInfo() {
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    async function fetchAppInfo() {
      if (!window.electronAPI) return;

      try {
        const version = await window.electronAPI.getVersion();
        const dataPath = await window.electronAPI.getPath('userData');
        
        setInfo({
          version,
          platform: navigator.platform,
          dataPath,
        });
      } catch (error) {
        console.error('获取应用信息失败', error);
      }
    }

    fetchAppInfo();
  }, []);

  if (!info) return <div>加载中...</div>;

  return (
    <Card title="应用信息">
      <Descriptions column={1}>
        <Descriptions.Item label="版本">{info.version}</Descriptions.Item>
        <Descriptions.Item label="平台">{info.platform}</Descriptions.Item>
        <Descriptions.Item label="数据路径">{info.dataPath}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
```

## 动画示例

### 页面过渡动画

```typescript
// components/PageTransition.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 列表动画

```typescript
// components/AnimatedList.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Item {
  id: number;
  title: string;
}

interface AnimatedListProps {
  items: Item[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AnimatedList({ items }: AnimatedListProps) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {items.map((listItem) => (
        <motion.li
          key={listItem.id}
          variants={item}
          className="p-4 bg-white rounded-lg shadow"
        >
          {listItem.title}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## 表单示例

### 登录表单

```typescript
// components/LoginForm.tsx
'use client';

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormValues) => {
    try {
      console.log('登录信息:', values);
      message.success('登录成功！');
    } catch (error) {
      message.error('登录失败');
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="用户名" 
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
```

## 数据获取示例

### 数据列表组件

```typescript
// components/UserList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { List, Avatar, Spin, Alert } from 'antd';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUsers: User[] = [
          { id: 1, name: '张三', email: 'zhang@example.com', avatar: 'https://via.placeholder.com/40' },
          { id: 2, name: '李四', email: 'li@example.com', avatar: 'https://via.placeholder.com/40' },
          { id: 3, name: '王五', email: 'wang@example.com', avatar: 'https://via.placeholder.com/40' },
        ];
        
        setUsers(mockUsers);
      } catch (err) {
        setError('加载失败');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.name}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
```

## 自定义 Hook 示例

### useDebounce

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用示例
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      console.log('搜索:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

### useElectronStore

```typescript
// hooks/useElectronStore.ts
import { useState, useEffect, useCallback } from 'react';

export function useElectronStore<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // 从 localStorage 加载（在实际应用中可能是从 electron-store）
    const stored = localStorage.getItem(key);
    if (stored) {
      setValue(JSON.parse(stored));
    }
  }, [key]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key]);

  return [value, updateValue] as const;
}
```

---

这些示例涵盖了项目中最常用的场景，你可以直接复制使用或根据需求修改。
