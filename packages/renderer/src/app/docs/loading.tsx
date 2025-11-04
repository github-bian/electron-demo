'use client';

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center">
      <Spin size="large" tip="加载文档..." />
    </div>
  );
}
