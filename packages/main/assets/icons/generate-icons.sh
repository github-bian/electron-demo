#!/bin/bash

# Electron 图标生成脚本
# 此脚本将 SVG 转换为所需的图标格式

echo "🎨 Electron 图标生成工具"
echo "======================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICON_DIR="$SCRIPT_DIR"
SVG_FILE="$ICON_DIR/icon.svg"

# 检查是否安装了 ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ 未找到 ImageMagick"
    echo "📦 请先安装 ImageMagick:"
    echo "   macOS:   brew install imagemagick"
    echo "   Ubuntu:  sudo apt-get install imagemagick"
    echo "   Windows: https://imagemagick.org/script/download.php"
    exit 1
fi

echo "📁 图标目录: $ICON_DIR"

# 生成 PNG (512x512 用于 macOS/Linux)
echo "🖼️  生成 PNG 图标..."
convert -background none "$SVG_FILE" -resize 512x512 "$ICON_DIR/icon.png"
echo "✅ icon.png 已生成 (512x512)"

# 生成 ICO (多尺寸用于 Windows)
echo "🖼️  生成 ICO 图标..."
convert -background none "$SVG_FILE" \
    \( -clone 0 -resize 16x16 \) \
    \( -clone 0 -resize 32x32 \) \
    \( -clone 0 -resize 48x48 \) \
    \( -clone 0 -resize 256x256 \) \
    -delete 0 "$ICON_DIR/icon.ico"
echo "✅ icon.ico 已生成 (16,32,48,256)"

# 生成托盘图标 (16x16)
echo "🖼️  生成托盘图标..."
convert -background none "$SVG_FILE" -resize 16x16 "$ICON_DIR/tray-icon.png"
convert -background none "$SVG_FILE" -resize 32x32 "$ICON_DIR/tray-icon@2x.png"
echo "✅ 托盘图标已生成"

echo ""
echo "🎉 所有图标已生成完成！"
echo "📍 图标位置: $ICON_DIR"
echo ""
echo "提示: 如果你想使用自定义图标，请："
echo "1. 准备一个 SVG 文件替换 icon.svg"
echo "2. 重新运行此脚本生成所有格式"
