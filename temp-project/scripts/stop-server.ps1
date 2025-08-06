# 서버 중지 스크립트
# 사용법: .\scripts\stop-server.ps1

Write-Host "🛑 서버 중지 중..." -ForegroundColor Yellow

# 포트 3000과 3001에서 실행 중인 프로세스 찾기
$port3000Process = netstat -ano | findstr ":3000" | findstr "LISTENING"
$port3001Process = netstat -ano | findstr ":3001" | findstr "LISTENING"

if ($port3000Process) {
    Write-Host "🔍 포트 3000에서 실행 중인 프로세스를 찾았습니다..." -ForegroundColor Yellow
    $pid = ($port3000Process -split '\s+')[-1]
    Write-Host "🔄 프로세스 ID $pid를 종료합니다..." -ForegroundColor Yellow
    taskkill /PID $pid /F
    Write-Host "✅ 포트 3000 서버가 중지되었습니다" -ForegroundColor Green
}

if ($port3001Process) {
    Write-Host "🔍 포트 3001에서 실행 중인 프로세스를 찾았습니다..." -ForegroundColor Yellow
    $pid = ($port3001Process -split '\s+')[-1]
    Write-Host "🔄 프로세스 ID $pid를 종료합니다..." -ForegroundColor Yellow
    taskkill /PID $pid /F
    Write-Host "✅ 포트 3001 서버가 중지되었습니다" -ForegroundColor Green
}

if (-not $port3000Process -and -not $port3001Process) {
    Write-Host "ℹ️ 실행 중인 서버가 없습니다" -ForegroundColor Gray
}

# Node.js 프로세스 확인
$nodeProcesses = tasklist | findstr "node.exe"
if ($nodeProcesses) {
    Write-Host "🔍 Node.js 프로세스가 실행 중입니다:" -ForegroundColor Yellow
    Write-Host $nodeProcesses -ForegroundColor Gray
    Write-Host "💡 모든 Node.js 프로세스를 종료하려면: taskkill /IM node.exe /F" -ForegroundColor Yellow
}

Write-Host "✅ 서버 중지 완료!" -ForegroundColor Green 