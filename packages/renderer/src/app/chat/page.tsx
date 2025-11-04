'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
  }>>([]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user' as const,
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // 模拟回复
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: '这是一个演示回复',
          role: 'assistant',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 消息列表 */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            开始对话吧...
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/60 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="flex items-end space-x-2">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="输入消息... (Shift+Enter 换行)"
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1"
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!input.trim()}
          />
          {messages.length > 0 && (
            <Button 
              icon={<DeleteOutlined />}
              onClick={() => setMessages([])}
            />
          )}
        </div>
      </div>
    </div>
  );
}
