/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 优化性能配置
  swcMinify: true,
  reactStrictMode: true,
  // 开启实验性功能以提升性能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['antd', 'framer-motion'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
