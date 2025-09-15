# WebGL Deployment Troubleshooting History

## 개요
Shapespark WebGL 번들을 Next.js + Vercel 환경에 통합하는 과정에서 발생한 문제들과 해결 과정을 기록합니다.

## 문제 발생 순서 및 해결

### 1. 번들 크기 문제
**문제:** 초기 chungwoo 번들 (249MB)이 Vercel 빌드 타임아웃 발생
**해결:** webtoon 번들 (51MB → 24MB)로 변경, 불필요한 비디오 파일 제거

### 2. iframe 보안 정책 문제
**문제:** iframe 임베딩 시 `X-Frame-Options: DENY` 에러
**해결:** vercel.json에서 `X-Frame-Options: SAMEORIGIN`으로 변경

### 3. Asset 경로 해석 문제
**문제:** iframe 내에서 상대경로 에셋들이 부모 페이지 기준으로 해석
**시도한 해결책:**
- 절대경로로 변경 (실패)
- `<base href>` 동적 설정 (실패) 
- 새 탭으로 열기 방식 채택

### 4. Next.js 라우팅 충돌
**문제:** `/webgl/` 경로를 Next.js가 동적 라우트로 인식하여 404 발생
**시도한 해결책:**
- vercel.json에 잘못된 `routes` 설정 (실패, 배포 실패 유발)
- next.config.js에 `rewrites` 설정 (부분적 해결)
**최종 해결:** WebGL 파일들을 `/webtoon-webgl/` 루트 레벨로 이동

### 5. MIME 타입 누락 문제 (핵심 이슈)
**문제:** CSS, JS 파일이 로드되지만 `Content-Type` 헤더 누락으로 브라우저가 인식 못함
**증상:** 파일은 200/304로 로드되지만 스타일/스크립트 실행 안됨
**해결:** vercel.json에 명시적 MIME 타입 헤더 추가
```json
{
  "source": "/(.*).css",
  "headers": [{"key": "Content-Type", "value": "text/css; charset=utf-8"}]
},
{
  "source": "/(.*).js", 
  "headers": [{"key": "Content-Type", "value": "application/javascript; charset=utf-8"}]
}
```

### 6. 상대경로 해석 문제
**문제:** 루트 레벨로 이동한 WebGL HTML에서 상대경로가 잘못 해석
**해결:** HTML에 `<base href="/webtoon-webgl/">` 태그 추가

## 최종 구조

```
temp-project/
├── public/
│   ├── webtoon-webgl/           # WebGL 번들 (루트 레벨)
│   │   ├── index.html           # <base href="/webtoon-webgl/"> 포함
│   │   └── 2022-10-06-18-29-43/ # Shapespark 에셋들
│   └── test-simple.html         # 디버깅용 테스트 파일
├── src/app/webgl-test/          # WebGL 테스트 페이지
└── vercel.json                  # MIME 타입 및 보안 헤더 설정
```

## 핵심 교훈

1. **MIME 타입이 가장 중요:** 파일이 로드되어도 브라우저가 타입을 모르면 실행 안됨
2. **상대경로 주의:** iframe이나 서브디렉토리에서는 `<base>` 태그 필수
3. **Next.js 라우팅:** `/path/` 형태는 동적 라우트로 인식될 수 있음
4. **단계별 디버깅:** 간단한 테스트 파일로 근본 원인 파악 후 해결

## 테스트 방법

1. `/test-simple.html` - 기본 정적 파일 서빙 테스트
2. `/webtoon-webgl/index.html` - WebGL 직접 접근
3. `/webgl-test` - 통합된 UI에서 테스트

## 관련 파일

- `temp-project/vercel.json` - 배포 설정
- `temp-project/src/app/webgl-test/page.tsx` - 테스트 페이지
- `temp-project/public/webtoon-webgl/index.html` - WebGL HTML