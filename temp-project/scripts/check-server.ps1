# 서버 상태 확인 스크립트
# 사용법: .\scripts\check-server.ps1

Write-Host "🔍 서버 상태 확인 중..." -ForegroundColor Yellow

# 포트 3000 확인
$port3000 = netstat -ano | findstr ":3000" | findstr "LISTENING"
if ($port3000) {
    Write-Host "✅ 포트 3000에서 서버가 실행 중입니다" -ForegroundColor Green
    Write-Host "🌐 접속 URL: http://localhost:3000" -ForegroundColor Cyan
} else {
    Write-Host "❌ 포트 3000에서 서버가 실행되지 않습니다" -ForegroundColor Red
}

# 포트 3001 확인
$port3001 = netstat -ano | findstr ":3001" | findstr "LISTENING"
if ($port3001) {
    Write-Host "✅ 포트 3001에서 서버가 실행 중입니다" -ForegroundColor Green
    Write-Host "🌐 접속 URL: http://localhost:3001" -ForegroundColor Cyan
} else {
    Write-Host "❌ 포트 3001에서 서버가 실행되지 않습니다" -ForegroundColor Red
}

# Node.js 프로세스 확인
$nodeProcesses = tasklist | findstr "node.exe"
if ($nodeProcesses) {
    Write-Host "✅ Node.js 프로세스가 실행 중입니다" -ForegroundColor Green
    Write-Host $nodeProcesses -ForegroundColor Gray
} else {
    Write-Host "❌ Node.js 프로세스가 실행되지 않습니다" -ForegroundColor Red
}

# 권장사항
if ($port3000 -or $port3001) {
    Write-Host ""
    Write-Host "💡 권장사항:" -ForegroundColor Yellow
    Write-Host "- 기존 서버를 그대로 사용하세요" -ForegroundColor White
    Write-Host "- 코드 변경사항은 자동으로 반영됩니다" -ForegroundColor White
    Write-Host "- 새로 서버를 실행하지 마세요" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "🚀 서버를 시작하려면:" -ForegroundColor Yellow
    Write-Host "cd temp-project" -ForegroundColor White
    Write-Host "npm run dev" -ForegroundColor White
}

Write-Host ""
Write-Host "완료!" -ForegroundColor Green 