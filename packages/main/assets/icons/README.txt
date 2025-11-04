Electron 应用图标配置指南
============================

## 📁 当前目录文件说明

- icon.svg - SVG 源文件 (可编辑)
- icon.png - macOS/Linux 图标 (需要 512x512 或 1024x1024)
- icon.ico - Windows 图标 (需要多尺寸: 16, 32, 48, 256)
- generate-icons.sh - 图标生成脚本

## 🎨 如何更换图标

### 方法1: 使用在线工具 (推荐)

1. 准备你的图标设计 (推荐尺寸 1024x1024)
2. 访问以下在线工具:
   - PNG 转 ICO: https://www.icoconverter.com/
   - 或使用: https://convertio.co/zh/png-ico/

3. 生成所需格式:
   - icon.png (512x512 或 1024x1024)
   - icon.ico (包含 16x16, 32x32, 48x48, 256x256)

4. 替换本目录中的文件

### 方法2: 使用本地工具

如果你安装了 ImageMagick:
```bash
brew install imagemagick  # macOS
```

然后运行生成脚本:
```bash
cd packages/main/assets/icons
./generate-icons.sh
```

### 方法3: 使用设计软件

1. 使用 Figma/Sketch/Photoshop 设计图标
2. 导出为 PNG (1024x1024)
3. 使用在线工具转换为其他格式

## 🖼️ 图标设计建议

- ✅ 使用简洁的设计,避免过多细节
- ✅ 保持清晰的轮廓和对比度
- ✅ 使用与应用主题一致的颜色
- ✅ 确保在 16x16 小尺寸下仍然清晰可辨
- ✅ 使用透明背景 (PNG)
- ✅ 考虑深色和浅色模式下的显示效果

## 📦 打包时的图标配置

图标配置已在 package.json 中设置:

```json
"build": {
  "mac": {
    "icon": "assets/icons/icon.png"
  },
  "win": {
    "icon": "assets/icons/icon.ico"
  },
  "linux": {
    "icon": "assets/icons/icon.png"
  }
}
```

## 🔄 更新图标后

1. 重新编译项目: `pnpm build`
2. 重新打包: `pnpm package`
3. 新图标将在下次启动应用时生效

## 🎯 托盘图标

托盘图标会自动使用主图标,并缩放到 16x16。
如果需要自定义托盘图标,请在代码中修改 createTray() 函数。

## 🌐 免费图标资源

- Flaticon: https://www.flaticon.com/
- Icons8: https://icons8.com/
- Iconfinder: https://www.iconfinder.com/
- Feather Icons: https://feathericons.com/

## ⚠️ 注意事项

- Windows ICO 文件必须包含多个尺寸
- macOS 推荐使用 1024x1024 的 PNG
- 托盘图标建议使用单色或简单设计
- 打包后的图标路径是相对于编译输出的
