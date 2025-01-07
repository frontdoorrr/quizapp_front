#!/bin/bash

echo "🏗️  Starting build process..."

# 현재 디렉토리가 quizapp인지 확인
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the quizapp directory."
    exit 1
fi

# node_modules 확인
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 이전 빌드 제거
if [ -d "build" ]; then
    echo "🗑️  Removing previous build..."
    rm -rf build
fi



# 빌드 실행
echo "🚀 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed!"
    exit 1
fi
