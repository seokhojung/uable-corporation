# Uable Corporation - 3D/AR/WebXR 포트폴리오

## 🚀 빠른 시작

### 🎯 **추천 방법: 간단한 서버 시작**
```bash
# 가장 간단한 방법 (모든 문제 자동 해결)
npm run server
```

### 🔧 기존 방법들

#### 서버 실행 전 확인사항

**중요**: 서버를 실행하기 전에 항상 기존 서버 상태를 확인하세요!

```bash
# 1. 서버 상태 확인
npm run check-server

# 2. 기존 서버가 실행 중이면 그대로 사용
# 3. 서버가 없을 때만 새로 실행
npm run dev
```

#### 안전한 서버 실행
```bash
# 자동으로 서버 상태를 확인하고 실행
npm run dev-safe
```

## 🛡️ 중복 실행 방지

### 체크리스트
- [ ] `npm run check-server` 실행
- [ ] 기존 서버 확인
- [ ] 필요시에만 새로 실행
- [ ] 브라우저에서 접속 테스트

### 일반적인 실수
- ❌ 서버 상태 확인 없이 바로 `npm run dev`
- ❌ 이미 실행 중인 서버 무시
- ❌ 포트 충돌 무시

## 🆕 개선된 서버 시작 시스템

### 문제 해결 자동화
새로운 `npm run server` 명령어는 다음을 자동으로 처리합니다:

1. **디렉토리 확인**: 올바른 위치에서 실행되는지 확인
2. **서버 상태 확인**: 이미 실행 중인 서버가 있는지 확인
3. **의존성 확인**: node_modules가 없으면 자동 설치
4. **오류 방지**: 모든 일반적인 문제를 사전에 해결

### 사용법
```bash
# 어디서든 실행 가능 (자동으로 temp-project로 이동)
npm run server

# 또는
npm run start-server
```

## 📁 프로젝트 구조

```
temp-project/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── data/               # 정적 데이터
│   └── types/              # TypeScript 타입 정의
├── scripts/                # 유틸리티 스크립트
│   ├── check-server.ps1    # 서버 상태 확인
│   └── start-server.ps1    # 개선된 서버 시작
└── package.json            # 프로젝트 설정
```

## 🌐 접속 URL

- **홈페이지**: `http://localhost:3000` 또는 `http://localhost:3001`
- **포트폴리오**: `http://localhost:3000/portfolio` 또는 `http://localhost:3001/portfolio`
- **문의하기**: `http://localhost:3000/contact` 또는 `http://localhost:3001/contact`
- **관리자 페이지**: `http://localhost:3000/admin` 또는 `http://localhost:3001/admin`

## 🔧 개발 도구

### 스크립트
- `npm run server`: **추천** - 개선된 서버 시작 (모든 문제 자동 해결)
- `npm run dev`: 기본 개발 서버 실행
- `npm run check-server`: 서버 상태 확인
- `npm run dev-safe`: 안전한 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run lint`: 코드 린팅

### 핫 리로드
- 코드 변경 시 자동으로 반영
- 브라우저 새로고침 불필요
- 실시간 개발 환경

## 🎨 디자인 시스템

### 다크 테마
- 전체 애플리케이션이 다크 테마로 통일
- 슬레이트 계열 색상 사용
- 글래스모피즘 효과 적용

### 반응형 디자인
- 모바일 우선 설계
- 모든 화면 크기 대응
- 터치 친화적 인터페이스

## 📝 최근 업데이트

- ✅ 다크 테마 완전 적용
- ✅ 반응형 디자인 최적화
- ✅ 성능 최적화 완료
- ✅ 중복 실행 방지 시스템 구축
- ✅ 문의 시스템 완성 (Story 3.2, 3.3)
- ✅ 관리자 인증 시스템 구현 (Story 3.4)
- ✅ **개선된 서버 시작 시스템 추가** 🆕

## 🔐 관리자 시스템

### 로그인 정보
- **사용자명**: `admin`
- **비밀번호**: `password`
- **접속 URL**: `/admin`

### 기능
- ✅ JWT 기반 인증
- ✅ bcryptjs 비밀번호 해싱
- ✅ 문의 내역 조회
- ✅ 로그아웃 기능
- ✅ 반응형 관리자 UI

## 🚨 문제 해결

### 서버 관련 문제
1. `npm run server` 실행 (추천)
2. 또는 `npm run check-server` 실행 후 기존 프로세스 확인
3. 필요시 프로세스 종료 후 재시작

### 빌드 오류
1. `npm install` 실행
2. `.next` 폴더 삭제
3. `npm run server` 재시작

### 일반적인 문제들
- **"Missing script: dev"**: `npm run server` 사용
- **디렉토리 오류**: `npm run server`가 자동으로 해결
- **의존성 문제**: `npm run server`가 자동으로 설치

---

**개발팀**: Uable Corporation  
**버전**: 1.0  
**최종 업데이트**: 2024년 현재
