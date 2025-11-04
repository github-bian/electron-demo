'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, Space } from 'antd';
import { 
  CloseOutlined, 
  MinusOutlined, 
  BorderOutlined 
} from '@ant-design/icons';

const TitleBarContainer = styled.div`
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  -webkit-app-region: drag;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const WindowControls = styled(Space)`
  -webkit-app-region: no-drag;
`;

const ControlButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  &.close:hover {
    background: #e81123;
    color: white;
  }
`;

const TitleBar: React.FC = () => {
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  return (
    <TitleBarContainer>
      <Title>Electron React App</Title>
      <WindowControls size={4}>
        <ControlButton 
          icon={<MinusOutlined />} 
          onClick={handleMinimize}
        />
        <ControlButton 
          icon={<BorderOutlined />} 
          onClick={handleMaximize}
        />
        <ControlButton 
          className="close"
          icon={<CloseOutlined />} 
          onClick={handleClose}
        />
      </WindowControls>
    </TitleBarContainer>
  );
};

export default TitleBar;
