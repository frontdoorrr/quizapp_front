#!/bin/bash

echo "🚀 Starting the application..."

# 현재 디렉토리가 quizapp인지 확인
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the quizapp directory."
    exit 1
fi

# build 디렉토리 확인
if [ ! -d "build" ]; then
    echo "❌ Error: build directory not found. Please run build.sh first."
    exit 1
fi

# serve 패키지 전역 설치 확인
if ! command -v serve &> /dev/null; then
    echo "📦 Installing serve package globally..."
    npm install -g serve
fi

# 포트 3000 사용 중인지 확인
PORT_PID=$(lsof -ti:3000)
if [ ! -z "$PORT_PID" ]; then
    echo "⚠️  Port 3000 is already in use. Attempting to kill the process..."
    kill -9 $PORT_PID
    sleep 2
fi

# 프로덕션 빌드 실행
echo "🌐 Starting production server..."
serve -s build
