'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Space, Typography } from 'antd';
import styled from 'styled-components';
import { 
  RocketOutlined, 
  ThunderboltOutlined, 
  HeartOutlined,
  GithubOutlined 
} from '@ant-design/icons';
import TitleBar from '@/components/TitleBar';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Content = styled.main`
  flex: 1;
  overflow: auto;
  padding: 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: white;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const FeatureCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  transition: all 0.3s ease;
`;

const features = [
  {
    icon: <RocketOutlined style={{ fontSize: '2rem', color: '#667eea' }} />,
    title: 'React 19',
    description: '使用最新的 React 19 特性，包括并发渲染和自动批处理',
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: '2rem', color: '#f59e0b' }} />,
    title: 'Next.js',
    description: '基于 Next.js 14 的强大路由和优化功能',
  },
  {
    icon: <HeartOutlined style={{ fontSize: '2rem', color: '#ec4899' }} />,
    title: 'Tailwind CSS',
    description: '使用 Tailwind CSS 快速构建现代化界面',
  },
];

export default function HomePage() {
  const [version, setVersion] = React.useState<string>('');

  React.useEffect(() => {
    // Get app version from Electron
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.getVersion().then(setVersion);
    }
  }, []);

  return (
    <PageContainer>
      <TitleBar />
      
      <Content>
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title level={1} style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem' }}>
              🚀 Electron + React 19
            </Title>
            <Paragraph style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
              现代化的桌面应用开发模板
            </Paragraph>
            {version && (
              <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
                版本: {version}
              </Paragraph>
            )}
            <Space size="large" style={{ marginTop: '2rem' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="primary" size="large" icon={<RocketOutlined />}>
                  开始使用
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="large" icon={<GithubOutlined />} style={{ background: 'white' }}>
                  查看源码
                </Button>
              </motion.div>
            </Space>
          </motion.div>
        </HeroSection>

        <FeatureGrid>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard hoverable>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {feature.icon}
                  <Title level={3}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </Space>
              </FeatureCard>
            </motion.div>
          ))}
        </FeatureGrid>
      </Content>
    </PageContainer>
  );
}
