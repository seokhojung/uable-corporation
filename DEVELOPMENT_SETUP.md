# 개발 환경 설정 가이드

## 🚀 서버 실행 가이드

### 올바른 서버 실행 순서:

1. **서버 상태 확인**
   ```bash
   # 포트 3000 확인
   netstat -ano | findstr :3000
   
   # 포트 3001 확인  
   netstat -ano | findstr :3001
   
   # Node.js 프로세스 확인
   tasklist | findstr node.exe
   ```

2. **기존 서버가 실행 중인 경우**
   - ✅ **그대로 사용**: `http://localhost:3000` 또는 `http://localhost:3001`
   - ✅ **핫 리로드**: 코드 변경 시 자동 반영
   - ❌ **새로 실행하지 않음**

3. **서버가 실행되지 않은 경우에만**
   ```bash
   cd temp-project
   npm run dev
   ```

### 🚫 중복 실행 방지 체크리스트:

- [ ] 포트 상태 확인
- [ ] 기존 프로세스 확인  
- [ ] 브라우저에서 접속 테스트
- [ ] 필요시에만 새로 실행

## 🎨 다크모드 개발 가이드

### 현재 테마 상태
- ✅ **다크모드**: 완전 적용 완료
- 🔄 **라이트모드**: 향후 변환 고려 필요
- 🎯 **색상 시스템**: 슬레이트 계열 통일

### 다크모드 색상 체계
```css
/* 배경 */
bg-slate-900    /* 메인 배경 */
bg-slate-800    /* 카드 배경 */
bg-slate-700    /* 섹션 배경 */

/* 텍스트 */
text-slate-100  /* 주요 텍스트 */
text-slate-300  /* 보조 텍스트 */
text-slate-400  /* 설명 텍스트 */

/* 테두리 */
border-slate-700 /* 카드 테두리 */
border-slate-600 /* 버튼 테두리 */
```

### 라이트모드 변환 고려사항

#### 1. 색상 변수화
```css
/* 현재: 하드코딩된 색상 */
bg-slate-900

/* 향후: CSS 변수 사용 */
bg-[var(--bg-primary)]
```

#### 2. 테마 토글 시스템
```typescript
// 향후 구현 예정
const [theme, setTheme] = useState<'dark' | 'light'>('dark')
```

#### 3. 조건부 스타일링
```jsx
// 현재: 다크모드만
className="bg-slate-900 text-slate-100"

// 향후: 테마별 분기
className={`${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-white text-gray-900'}`}
```

## ✅ 완료된 작업들

### 🎨 디자인 시스템
- [x] 다크 테마 완전 적용
- [x] 슬레이트 계열 색상 통일
- [x] 글래스모피즘 효과 적용
- [x] 반응형 디자인 완성

### 📱 페이지별 구현
- [x] 랜딩페이지 (홈)
- [x] 포트폴리오 목록 페이지
- [x] 포트폴리오 상세 페이지
- [x] 문의하기 페이지 (Story 3.2 완료)
- [x] 404 에러 페이지

### 🔧 기술적 구현
- [x] TypeScript 타입 오류 해결
- [x] 이미지 최적화 (priority, lazy loading)
- [x] 성능 최적화 (LCP, 번들 크기)
- [x] 접근성 개선 (색상 대비, 키보드 네비게이션)

### 🛠️ 개발 환경
- [x] 서버 중복 실행 방지 시스템
- [x] 자동화 스크립트 구축
- [x] 개발 가이드 문서화
- [x] 에러 처리 및 디버깅

### 🗄️ 백엔드 시스템 (Story 3.1 완료)
- [x] Prisma 데이터베이스 설정
- [x] 문의 데이터 스키마 정의
- [x] API 엔드포인트 구현 (`POST /api/inquiries`)
- [x] 데이터 검증 및 보안
- [x] 스팸 방지 기능
- [x] XSS 방지 및 입력 데이터 정리
- [x] 요청 제한 및 속도 제한

### 📝 프론트엔드 문의 시스템 (Story 3.2 완료)
- [x] 문의 양식 컴포넌트 생성
- [x] 다크모드 적용
- [x] 반응형 디자인
- [x] 폼 검증 및 에러 처리
- [x] 실시간 폼 상태 관리
- [x] 성공/실패 피드백 UI
- [x] 카테고리 선택 기능
- [x] 연락처 정보 섹션

## 🔄 진행 중인 작업

### 🎯 다크모드 기반 개발
- [x] 새로운 컴포넌트 개발 시 다크모드 우선
- [x] 색상 변수 시스템 구축
- [x] 테마 토글 기능 설계
- [x] 라이트모드 변환 준비

### 📈 성능 최적화
- [ ] 이미지 압축 및 최적화
- [ ] 코드 스플리팅 개선
- [ ] 번들 크기 최적화
- [ ] 로딩 성능 개선

## 🚧 향후 계획

### 🎨 UI/UX 개선
- [ ] 애니메이션 효과 추가
- [ ] 인터랙션 개선
- [ ] 마이크로 인터랙션
- [ ] 로딩 상태 개선

### 🔧 기능 확장
- [ ] 검색 기능 구현
- [ ] 필터링 시스템
- [ ] 정렬 기능
- [ ] 페이지네이션

### 📱 모바일 최적화
- [ ] 터치 제스처 추가
- [ ] 모바일 전용 기능
- [ ] PWA 지원
- [ ] 오프라인 기능

## 🗄️ 백엔드 API 가이드

### 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma db push

# 데이터베이스 확인
npx prisma studio
```

### API 엔드포인트

#### 문의 생성 API
- **URL**: `POST /api/inquiries`
- **Content-Type**: `application/json`
- **요청 예시**:
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "phone": "010-1234-5678",
  "company": "테스트 회사",
  "subject": "프로젝트 문의",
  "message": "3D/AR 프로젝트에 대해 문의드립니다.",
  "category": "project"
}
```

#### API 테스트
- **URL**: `GET /api/test`
- **용도**: 데이터베이스 연결 및 API 상태 확인

### 보안 기능
- ✅ **스팸 방지**: IP 기반 요청 제한, 키워드 필터링
- ✅ **데이터 검증**: 필수 필드, 이메일 형식, 내용 길이 검증
- ✅ **XSS 방지**: 입력 데이터 이스케이프 처리
- ✅ **요청 제한**: 1분당 3회, 1시간당 10회 제한

## 🔧 일반적인 오류와 해결방법

### PowerShell 명령어 오류
**오류**: `The token '&&' is not a valid statement separator`
**해결**: `&&` 대신 `;` 사용
```bash
# 잘못된 방법
cd temp-project && npm run dev

# 올바른 방법  
cd temp-project; npm run dev
```

### 포트 충돌 오류
**오류**: `Port 3000 is in use, trying 3001 instead`
**해결**: 
1. 기존 서버 사용 (권장)
2. 또는 기존 프로세스 종료 후 재시작

### 권한 오류
**오류**: `EPERM: operation not permitted`
**해결**: 
1. 관리자 권한으로 실행
2. 또는 `.next` 폴더 삭제 후 재시작

### Prisma 오류
**오류**: `Native type VarChar is not supported for sqlite connector`
**해결**: SQLite에서는 `@db.VarChar` 대신 `String` 사용

## 📁 프로젝트 구조

```
temp-project/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 라우트
│   │   │   ├── inquiries/  # 문의 API
│   │   │   └── test/       # 테스트 API
│   │   ├── contact/        # 문의하기 페이지
│   │   │   └── page.tsx    # 문의 양식
│   │   └── ...
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── data/               # 정적 데이터
│   ├── hooks/              # 커스텀 훅
│   ├── lib/                # 유틸리티 함수
│   │   ├── prisma.ts       # Prisma 클라이언트
│   │   ├── validation.ts   # 데이터 검증
│   │   └── spam-protection.ts # 스팸 방지
│   ├── styles/             # 스타일 파일
│   └── types/              # TypeScript 타입 정의
│       └── inquiry.ts      # 문의 시스템 타입
├── prisma/                 # 데이터베이스 스키마
│   └── schema.prisma       # Prisma 스키마
├── public/                 # 정적 파일
└── package.json            # 프로젝트 설정
```

## 🎯 주요 컴포넌트

### 레이아웃 컴포넌트
- `Header`: 네비게이션 바
- `Footer`: 푸터 섹션
- `Container`: 반응형 컨테이너

### UI 컴포넌트
- `Button`: 버튼 컴포넌트
- `Badge`: 배지 컴포넌트
- `Card`: 카드 컴포넌트
- `PortfolioCard`: 포트폴리오 카드
- `ThemeToggle`: 테마 토글

### 페이지 컴포넌트
- `HomePage`: 랜딩 페이지
- `PortfolioPage`: 포트폴리오 목록
- `PortfolioDetailPage`: 포트폴리오 상세
- `ContactPage`: 문의하기 페이지

### 백엔드 시스템
- `Prisma Client`: 데이터베이스 ORM
- `Inquiry API`: 문의 생성/조회 API
- `Validation`: 데이터 검증 시스템
- `Spam Protection`: 스팸 방지 시스템

## 🌐 접속 URL

- **홈페이지**: `http://localhost:3000` 또는 `http://localhost:3001`
- **포트폴리오**: `http://localhost:3000/portfolio` 또는 `http://localhost:3001/portfolio`
- **포트폴리오 상세**: `http://localhost:3000/portfolio/[id]` 또는 `http://localhost:3001/portfolio/[id]`
- **문의하기**: `http://localhost:3000/contact` 또는 `http://localhost:3001/contact`
- **API 테스트**: `http://localhost:3001/api/test`
- **문의 API**: `POST http://localhost:3001/api/inquiries`

## 🔍 문제 해결

### 서버가 시작되지 않는 경우
1. 포트 확인: `netstat -ano | findstr :3000`
2. 프로세스 종료: `taskkill /f /im node.exe`
3. 재시작: `npm run dev`

### 빌드 오류가 발생하는 경우
1. 의존성 재설치: `npm install`
2. 캐시 삭제: `rm -rf .next`
3. 재시작: `npm run dev`

### 타입스크립트 오류가 발생하는 경우
1. 타입 체크: `npm run type-check`
2. 린트 체크: `npm run lint`
3. 오류 수정 후 재시작

### 데이터베이스 오류가 발생하는 경우
1. Prisma 클라이언트 재생성: `npx prisma generate`
2. 데이터베이스 동기화: `npx prisma db push`
3. 스키마 확인: `npx prisma studio`

## 💡 개발 팁

### 코드 변경 시
- 서버가 실행 중이면 자동으로 반영됨
- 브라우저 새로고침 불필요
- 콘솔에서 컴파일 상태 확인

### 성능 최적화
- 이미지 최적화: `next/image` 사용
- 코드 스플리팅: 자동으로 처리됨
- 번들 분석: `npm run analyze`

### 디버깅
- 브라우저 개발자 도구 활용
- Next.js 내장 디버깅 기능
- 콘솔 로그 확인

### API 테스트
- Postman 또는 curl 사용
- 브라우저 개발자 도구 Network 탭 활용
- `/api/test` 엔드포인트로 상태 확인

## 🎨 다크모드 개발 체크리스트

### 새로운 컴포넌트 개발 시
- [x] 다크모드 색상 우선 적용
- [x] 색상 대비 확인 (WCAG 기준)
- [x] 라이트모드 변환 고려
- [x] 접근성 테스트

### 색상 선택 가이드
- [x] 슬레이트 계열 우선 사용
- [x] 적절한 투명도 활용
- [x] 그라데이션 효과 적용
- [x] 호버 상태 고려

### 테마 시스템 준비
- [x] CSS 변수 구조 설계
- [x] 테마 토글 컴포넌트 준비
- [x] 조건부 스타일링 패턴
- [x] 색상 팔레트 정의

## 📋 다음 스토리 계획

### Story 3.3: [통합] 문의 양식 제출 기능 연동
- [x] 프론트엔드-백엔드 연동 (완료)
- [x] 에러 처리 및 피드백 (완료)
- [x] 로딩 상태 관리 (완료)

### Story 3.4: [백엔드] 관리자 페이지 기본 인증 및 레이아웃 구현
- [ ] 관리자 인증 시스템
- [ ] 보안 미들웨어
- [ ] 관리자 레이아웃

### Story 3.5: [관리자] 문의 내역 조회 기능 구현
- [ ] 문의 목록 페이지
- [ ] 필터링 및 검색
- [ ] 상세 보기

### Story 3.6: 문의하기 및 관리자 페이지 최종 폴리싱
- [ ] UI/UX 개선
- [ ] 성능 최적화
- [ ] 테스트 및 버그 수정

## 🎯 문의 시스템 기능

### 완료된 기능들
- ✅ **문의 양식**: 완전한 폼 UI
- ✅ **카테고리 선택**: 4가지 문의 유형
- ✅ **실시간 검증**: 입력 필드별 검증
- ✅ **에러 처리**: 상세한 에러 메시지
- ✅ **성공 피드백**: 전송 완료 알림
- ✅ **반응형 디자인**: 모든 디바이스 지원
- ✅ **다크모드**: 완전한 다크 테마 적용
- ✅ **애니메이션**: 부드러운 페이지 전환
- ✅ **접근성**: 키보드 네비게이션 지원

### 문의 양식 필드
- **필수 필드**: 이름, 이메일, 제목, 메시지
- **선택 필드**: 전화번호, 회사명
- **카테고리**: 일반 문의, 프로젝트 문의, 파트너십, 기타
- **검증**: 실시간 입력 검증 및 에러 표시 