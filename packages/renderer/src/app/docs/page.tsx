'use client';

import React from 'react';
import { Card, Typography, Divider } from 'antd';
import { 
  RocketOutlined, 
  CodeOutlined,
  ApiOutlined,
  BulbOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function DocsPage() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-4xl mx-auto">
        <Title level={2}>📚 使用文档</Title>
        <Paragraph className="text-gray-600 mb-6">
          快速了解如何使用这个 Electron 桌面应用
        </Paragraph>

        <div className="space-y-4">
          {/* 快速开始 */}
          <Card>
            <div className="flex items-start space-x-3">
              <RocketOutlined className="text-2xl text-blue-500 mt-1" />
              <div className="flex-1">
                <Title level={4}>快速开始</Title>
                <Paragraph>
                  本项目基于 Electron + React 19 + Next.js 构建，采用 Monorepo 架构管理。
                </Paragraph>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Text code>pnpm install</Text> - 安装依赖<br />
                  <Text code>pnpm dev</Text> - 启动开发服务器<br />
                  <Text code>pnpm build</Text> - 构建生产版本<br />
                  <Text code>pnpm package</Text> - 打包应用
                </div>
              </div>
            </div>
          </Card>

          {/* 技术栈 */}
          <Card>
            <div className="flex items-start space-x-3">
              <CodeOutlined className="text-2xl text-purple-500 mt-1" />
              <div className="flex-1">
                <Title level={4}>技术栈</Title>
                <ul className="list-disc list-inside space-y-1">
                  <li><Text strong>Electron</Text> - 跨平台桌面应用框架</li>
                  <li><Text strong>React 19</Text> - 支持并发渲染的最新版本</li>
                  <li><Text strong>Next.js 14</Text> - App Router 和 SSR 支持</li>
                  <li><Text strong>TypeScript</Text> - 类型安全开发</li>
                  <li><Text strong>Tailwind CSS</Text> - 实用优先的 CSS 框架</li>
                  <li><Text strong>Ant Design</Text> - 企业级 UI 组件库</li>
                  <li><Text strong>Framer Motion</Text> - 动画库</li>
                  <li><Text strong>Zustand</Text> - 轻量级状态管理</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 项目结构 */}
          <Card>
            <div className="flex items-start space-x-3">
              <ApiOutlined className="text-2xl text-green-500 mt-1" />
              <div className="flex-1">
                <Title level={4}>项目结构</Title>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div>📁 packages/</div>
                  <div className="ml-4">📁 main/ - Electron 主进程</div>
                  <div className="ml-4">📁 renderer/ - Next.js 渲染进程</div>
                  <div className="ml-4">📁 shared/ - 共享类型和常量</div>
                </div>
              </div>
            </div>
          </Card>

          {/* 功能特性 */}
          <Card>
            <div className="flex items-start space-x-3">
              <BulbOutlined className="text-2xl text-yellow-500 mt-1" />
              <div className="flex-1">
                <Title level={4}>核心特性</Title>
                <ul className="list-disc list-inside space-y-1">
                  <li>TypeScript Project References 实现跨包类型引用</li>
                  <li>通过预加载脚本暴露安全的 IPC 通信接口</li>
                  <li>支持页面动画和磨砂玻璃视觉效果</li>
                  <li>Next.js App Router 实现多页面路由</li>
                  <li>响应式布局和主题定制</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
