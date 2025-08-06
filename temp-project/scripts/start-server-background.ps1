# 백그라운드 서버 시작 스크립트
# 사용법: .\scripts\start-server-background.ps1

Write-Host "🚀 Uable Corporation 서버를 백그라운드에서 시작 중..." -ForegroundColor Cyan

# 1. 현재 디렉토리 확인 및 수정
$currentDir = Get-Location
Write-Host "📍 현재 디렉토리: $currentDir" -ForegroundColor Gray

# temp-project 디렉토리로 이동
if ($currentDir -notlike "*temp-project*") {
    Write-Host "📁 temp-project 디렉토리로 이동 중..." -ForegroundColor Yellow
    if (Test-Path "temp-project") {
        Set-Location "temp-project"
        Write-Host "✅ temp-project 디렉토리로 이동 완료" -ForegroundColor Green
    } else {
        Write-Host "❌ temp-project 디렉토리를 찾을 수 없습니다" -ForegroundColor Red
        Write-Host "💡 올바른 디렉토리에서 실행해주세요" -ForegroundColor Yellow
        exit 1
    }
}

# 2. 서버 상태 확인
Write-Host "🔍 서버 상태 확인 중..." -ForegroundColor Yellow

$port3000 = netstat -ano | findstr ":3000" | findstr "LISTENING"
$port3001 = netstat -ano | findstr ":3001" | findstr "LISTENING"

if ($port3000 -or $port3001) {
    Write-Host "✅ 서버가 이미 실행 중입니다!" -ForegroundColor Green
    if ($port3000) {
        Write-Host "🌐 접속 URL: http://localhost:3000" -ForegroundColor Cyan
    }
    if ($port3001) {
        Write-Host "🌐 접속 URL: http://localhost:3001" -ForegroundColor Cyan
    }
    Write-Host "💡 기존 서버를 그대로 사용하세요" -ForegroundColor Yellow
    exit 0
}

# 3. 의존성 확인 및 설치
Write-Host "📦 의존성 확인 중..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 node_modules가 없습니다. 의존성을 설치합니다..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 의존성 설치에 실패했습니다" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 의존성 설치 완료" -ForegroundColor Green
}

# 4. package.json 확인
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json을 찾을 수 없습니다" -ForegroundColor Red
    exit 1
}

# 5. 백그라운드에서 서버 시작
Write-Host "🚀 서버를 백그라운드에서 시작합니다..." -ForegroundColor Green
Write-Host "💡 브라우저에서 http://localhost:3000 으로 접속하세요" -ForegroundColor Cyan
Write-Host "💡 서버를 중지하려면: npm run stop-server" -ForegroundColor Yellow
Write-Host ""

# 백그라운드에서 서버 시작
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory (Get-Location)

Write-Host "✅ 서버가 백그라운드에서 시작되었습니다!" -ForegroundColor Green
Write-Host "🌐 접속 URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "💡 서버 상태 확인: npm run check-server" -ForegroundColor Yellow 