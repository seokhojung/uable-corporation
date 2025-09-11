# ✅ 다크/라이트 모드 수정 진행 체크리스트

## 📊 전체 현황 (2025-09-11 업데이트)
- **✅ 완료된 파일**: home-page-client.tsx (47개 → 0개) 
- **남은 파일**: 8개 파일에 applyThemeClasses 사용 중
- **총 남은 작업량**: 113개 applyThemeClasses (160개 - 47개)
- **진행률**: **29.4% 완료** (47/160)
- **🎯 주요 성과**: 가장 복잡한 메인 페이지 완료!

---

## 🚨 Phase 0: 사전 준비 (필수 추가)

### ⭐ 사전 체크리스트 ✅ **완료**
- [x] **Migration Context 분석**: 기존 마이그레이션과 충돌 없음 확인 ✅
- [x] **환경 변수 검토**: .env.local 올바른 설정 확인 ✅
- [x] **Git 브랜치**: fix/dark-mode-home-page 브랜치 사용 중 ✅ 
- [x] **백업 완료**: 홈페이지 완료 상태 커밋으로 저장 ✅

#### 환경 변수 확인
```bash
cat temp-project/.env.local
# 필수 확인 항목:
# NEXT_PUBLIC_THEME_SYSTEM=true
# NEXT_PUBLIC_THEME_TOGGLE_MIGRATED=true  
# NEXT_PUBLIC_THEME_DEBUG=true
```

#### 성능 기준점 측정
```bash
cd temp-project
npm run build
ls -la .next/static/css/ # CSS 파일 크기 확인
```

---

## 🎯 Phase 1: 핵심 페이지 수정 (최우선) (수정됨)

### ⭐ 1. 메인 페이지 (home-page-client.tsx) ✅ **완료!**
**실제 상황**: 47개 applyThemeClasses → 0개로 완전 제거 완료!
**목표**: 47개 applyThemeClasses → 직접 dark: 클래스 ✅

#### 완료된 섹션들 ✅
- [x] **Hero Section**: 메인 배경과 콘텐츠 다크모드 적용
- [x] **서비스 소개 섹션**: 비디오 및 서비스 카드들 
- [x] **포트폴리오 섹션**: 제목, 설명, 카드들
- [x] **프로세스 섹션**: 3단계 프로세스 카드들
- [x] **도입 효과 섹션**: 통계 카드들 (구매전환률, 반품률, 만족도)
- [x] **CTA 섹션**: 마지막 행동 유도 버튼들
- [x] **Import 정리**: applyThemeClasses import 제거

#### 수정 진행률: ✅ **100% 완료** (47개 → 0개)

### ⭐ 2. 헤더 (header.tsx)  
**목표**: 11개 applyThemeClasses → 직접 dark: 클래스

#### 수정 대상
- [ ] **Navigation Bar**: 상단 네비게이션 배경
- [ ] **Mobile Menu**: 모바일 메뉴 스타일
- [ ] **Logo Area**: 로고 영역 스타일

#### 수정 진행률: 0/11

### ⭐ 3. 푸터 (footer.tsx)
**목표**: 10개 applyThemeClasses → 직접 dark: 클래스  

#### 수정 대상
- [ ] **Footer Background**: 푸터 배경색
- [ ] **Link Styles**: 링크 텍스트 색상  
- [ ] **Divider Lines**: 구분선 색상

#### 수정 진행률: 0/10

### ⭐ 4. 연락처 페이지 (contact/page.tsx)
**목표**: 53개 applyThemeClasses → 직접 dark: 클래스

#### 수정 대상
- [ ] **Page Background**: 페이지 배경
- [ ] **Form Cards**: 입력 폼 카드들
- [ ] **Input Fields**: 입력 필드 스타일
- [ ] **Submit Buttons**: 제출 버튼들

#### 수정 진행률: 0/53

---

## 🔧 Phase 2: UI 컴포넌트 수정

### 5. 포트폴리오 카드 (portfolio-card.tsx)
**목표**: 16개 applyThemeClasses → 직접 dark: 클래스
- [ ] **Card Background**: 카드 배경색
- [ ] **Text Colors**: 제목, 설명 텍스트
- [ ] **Border Colors**: 카드 테두리
#### 수정 진행률: 0/16

### 6. 서비스 스크롤 (service-scroll.tsx)  
**목표**: 20개 applyThemeClasses → 직접 dark: 클래스
- [ ] **Scroll Container**: 스크롤 컨테이너 스타일
- [ ] **Service Items**: 개별 서비스 아이템들
#### 수정 진행률: 0/20

### 7. 조건부 테마 훅 (useConditionalTheme.ts)
**목표**: 2개 applyThemeClasses → 필요시 수정/제거
- [ ] **Hook Logic**: 훅 로직 검토
#### 수정 진행률: 0/2

### 8. 테마 클래스 매핑 (theme-class-mapping.ts)
**목표**: 1개 applyThemeClasses → 시스템 자체 검토
- [ ] **Mapping System**: 전체 매핑 시스템 재평가
#### 수정 진행률: 0/1

---

## 🧪 테스트 체크리스트

### 각 섹션 수정 후 확인사항
- [ ] **토글 동작**: 헤더 토글 버튼으로 즉시 색상 변경 확인
- [ ] **콘솔 에러**: 브라우저 콘솔에 에러 없음
- [ ] **레이아웃 깨짐**: 기존 레이아웃 유지 확인
- [ ] **반응형**: 모바일/태블릿에서도 정상 동작

### 전체 완료 후 최종 테스트
- [ ] **메인 페이지**: 모든 섹션 다크/라이트 전환
- [ ] **포트폴리오 페이지**: 카드들 색상 전환  
- [ ] **연락처 페이지**: 폼 영역 색상 전환
- [ ] **404 페이지**: 에러 페이지 색상 전환
- [ ] **브라우저 호환성**: Chrome, Firefox, Safari, Edge

---

## 📈 일일 진행 기록

### [날짜] - 작업 내용
- **시작 시간**: 
- **완료 시간**:
- **수정된 파일**:
- **완료된 applyThemeClasses 수**:
- **발견된 이슈**:
- **다음 작업**:

---

## 🚨 이슈 트래킹

### 발견된 문제들
| 날짜 | 파일 | 문제 | 상태 | 해결책 |
|------|------|------|------|---------|
| | | | | |

### 해결된 문제들  
| 날짜 | 파일 | 문제 | 해결책 |
|------|------|------|---------|
| 2025-09-11 | test-simple/page.tsx | Tailwind safelist 누락 | 명시적 클래스 나열 |
| 2025-09-11 | ThemeContext.tsx | 토글 동기화 실패 | 단일 ThemeContext 사용 |

---

## 🎯 다음 액션 아이템 (2025-09-11 업데이트)

### 즉시 실행 (우선순위 1) ✅ **홈페이지 완료!**
1. [x] **home-page-client.tsx 완료** - 47개 applyThemeClasses 모두 제거 ✅
2. [ ] **다크/라이트 모드 토글 테스트** - 브라우저에서 동작 확인
3. [ ] **header.tsx 수정** - 11개 applyThemeClasses 제거

### 단기 실행 (우선순위 2)  
4. [ ] **footer.tsx 수정** - 10개 applyThemeClasses 제거
5. [ ] **contact/page.tsx 수정** - 53개 applyThemeClasses 제거

### 중기 실행 (우선순위 3)
6. [ ] **UI 컴포넌트들 수정** - portfolio-card, service-scroll 등
7. [ ] **시스템 정리** - 불필요한 파일들 정리

---

**🎉 현재 상황**: 메인 페이지 완료! 다음은 헤더/푸터 수정으로 모든 페이지에 일관된 테마 적용!

---

## 🚨 코덱스 분석 기반 해결 방안 (긴급)

### 📋 확인된 토글 미작동 원인
✅ **코덱스 분석으로 정확한 원인 규명 완료**

1. **기능 플래그 불일치 문제** ⚠️
   - `footer.tsx`, `portfolio-card.tsx`, `service-scroll.tsx`: `=== 'true'` 사용
   - `header.tsx`, `home-page-client.tsx`: `!== 'false'` 사용
   - **결과**: 일부 컴포넌트만 applyThemeClasses 변환 동작

2. **페이지별 dark: 적용 불균등** ⚠️
   - **홈페이지**: ✅ 완전 변환됨 → 토글 작동
   - **포트폴리오**: ❌ dark: 클래스 0개, 하드코딩 7개 → 토글 안됨

3. **PostCSS 설정 충돌** ⚠️
   - `postcss.config.js` (v3)와 `postcss.config.mjs` (v4) 동시 존재

### 🔧 즉시 해결 방안

#### Phase A: 기능 플래그 통일 (10분)
- [ ] **모든 파일의 isThemeSystemEnabled를 `!== 'false'`로 통일**
  - footer.tsx, portfolio-card.tsx, service-scroll.tsx 수정
  - 환경변수 누락 상황에서도 기본적으로 활성화되도록

#### Phase B: PostCSS 설정 정리 (5분)  
- [ ] **postcss.config.mjs 파일 삭제** (v3에서는 .js 사용)
- [ ] **.next 폴더 삭제 후 서버 재시작**

#### Phase C: 기존 계획 계속 (헤더/푸터 우선)
- [ ] **header.tsx 수정** - 11개 applyThemeClasses 제거
- [ ] **footer.tsx 수정** - 10개 applyThemeClasses 제거