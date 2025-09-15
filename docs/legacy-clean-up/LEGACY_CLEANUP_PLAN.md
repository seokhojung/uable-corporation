# 🧹 레거시 제거 계획서 (Legacy Cleanup Plan)

## 📋 문서 정보
- **작성일**: 2025-01-15
- **대상 프로젝트**: Uable Corporation Frontend
- **마이그레이션 단계**: Phase 4 → Final Cleanup
- **예상 소요 시간**: 3-5시간 (검증 결과 반영)
- **위험도**: Medium (사전 조치 필요)
- **최종 검증일**: 2025-01-15
- **실행 상태**: ⚠️ 조건부 승인 (Phase 0 사전 준비 필요)

---

## 🎯 목적 및 목표

### 주요 목적
1. **코드베이스 단순화**: 이중 컴포넌트 시스템 제거
2. **Bundle 크기 최적화**: 불필요한 레거시 코드 제거
3. **유지보수성 향상**: 단일 컴포넌트 시스템으로 통합
4. **개발자 경험 개선**: 명확한 import 경로 정립

### 정량적 목표
- **Bundle 크기**: 20-30% 감소 예상
- **Import 참조**: 38개 파일, 70개 참조 → 0개 (레거시 경로)
- **파일 수**: 어댑터 파일 2개 확인됨, 추가 생성 필요
- **코드 복잡성**: Migration Context 80% 단순화
- **검증된 사용처**: Button(20+), Badge(10+), Card(5+)

---

## 📊 현재 상태 분석

### 완료된 신규 컴포넌트
```
✅ src/components/primitives/
├── Accordion/Accordion.tsx
├── Badge/Badge.tsx  
├── Button/Button.tsx
├── Card/Card.tsx
├── Dropdown/Dropdown.tsx
├── Input/Input.tsx
├── Modal/Modal.tsx
├── Select/Select.tsx
├── Tabs/Tabs.tsx
├── Toast/Toast.tsx
└── ThemeToggle/ThemeToggle.tsx
```

### 제거 대상 레거시 시스템 (검증 결과 업데이트)
```
✅ 완전 어댑터 시스템 (준비 완료)
├── button.tsx → button-adapter.tsx ✅

⚠️ 부분 마이그레이션 (사전 조치 필요)
├── badge.tsx ❌ (순수 레거시, 어댑터 비활성)
├── badge-adapter.tsx ✅ (존재하나 미연결)

🚨 미완성 마이그레이션 (긴급 조치 필요)
├── card.tsx ❌ (순수 레거시)
└── card-adapter.tsx ❌ (존재하지 않음)
```

### 의존성 현황 (검증 완료)
- **총 38개 파일**에서 `@/components/ui/*` import 사용
- **70번의 참조** 발견
- **주요 사용처**: 
  - Button: header.tsx, hero-section.tsx, contact/page.tsx, portfolio-card.tsx
  - Badge: home-page-client.tsx, webgl-gallery.tsx, hero-section.tsx
  - Card: solution-section.tsx, contact/page.tsx
- **어댑터 파일**: button-adapter.tsx, badge-adapter.tsx (2개 확인)

---

## 🛣️ 단계별 실행 계획 (검증 결과 반영)

### Phase 0: 사전 준비 (새로 추가 - 30분)
```bash
# 0-1. 빌드 환경 정리
cd temp-project
rm -rf .next
rm -rf node_modules/.cache

# 0-2. ESLint 설정
npm run lint
# → Strict 옵션 선택

# 0-3. Badge 어댑터 활성화
# src/components/ui/badge.tsx 수정 필요
# 현재: 순수 레거시 구현
# 변경: export { Badge } from './badge-adapter'

# 0-4. Card 어댑터 생성
# cp src/components/ui/button-adapter.tsx src/components/ui/card-adapter.tsx
# Card용으로 수정 필요

# 0-5. 사전 체크
echo "✅ 사전 준비 완료 - Phase 1 시작 가능"
```

### Phase 1: 사전 검증 및 백업 (30분)
```bash
# 1. 현재 브랜치 백업
git checkout -b legacy-cleanup-backup
git add .
git commit -m "Backup before legacy cleanup"

# 2. 새 작업 브랜치 생성
git checkout main
git checkout -b legacy-cleanup

# 3. 현재 빌드 상태 확인 (검증된 문제점 해결 후)
# 주의: Windows 권한 문제로 인한 빌드 실패 가능
npm run build 2>/dev/null || echo "⚠️ 빌드 실패 - .next 폴더 정리 필요"
npm run lint || echo "⚠️ ESLint 설정 필요"

# 4. Bundle 크기 측정 (기준점)
npx @next/bundle-analyzer
```

### Phase 2: 완전 마이그레이션 활성화 (30분 - 업데이트)
```typescript
// 목표: 모든 컴포넌트를 새 버전으로 전환

// 2-1. MigrationContext.tsx 수정
const allComponents = [
  'Button', 'Badge', 'Card', 'Input', 'Modal',
  'Select', 'Tabs', 'Toast', 'Accordion', 'Dropdown',
  'ThemeToggle', 'ThemeSystem'
]

// 2-2. 개발 환경에서 강제 활성화
if (process.env.NODE_ENV === 'development') {
  setMigratedComponents(new Set(allComponents))
}
```

### Phase 3: 기능 검증 테스트 (45분)
```bash
# 3-1. 개발 서버 실행
npm run dev

# 3-2. 각 페이지별 수동 테스트
- / (홈페이지) - Hero, CTA 버튼 등
- /portfolio - 카드, 필터 버튼 등  
- /portfolio/[id] - 이미지 갤러리, 메트릭 등
- /webgl - WebGL 갤러리 UI
- /contact - 폼 요소, 제출 버튼 등
- /privacy - 기본 UI 요소

# 3-3. 반응형 테스트
- 모바일 (375px)
- 태블릿 (768px) 
- 데스크톱 (1200px)

# 3-4. 브라우저 호환성
- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
```

### Phase 4: Import 경로 일괄 변경 (60분)
```bash
# 4-1. 전체 파일에서 레거시 import 검색
grep -r "from '@/components/ui" src/

# 4-2. 일괄 변경 스크립트 실행
# Button
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/ui/button|@/components/primitives/Button|g'

# Badge  
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/ui/badge|@/components/primitives/Badge|g'

# Card
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/ui/card|@/components/primitives/Card|g'

# 4-3. 변경 결과 검증
grep -r "from '@/components/ui" src/ || echo "모든 import 변경 완료"
```

### Phase 5: 어댑터 시스템 제거 (30분)
```bash
# 5-1. 어댑터 파일 제거
rm src/components/ui/button.tsx
rm src/components/ui/button-adapter.tsx
rm src/components/ui/badge.tsx  
rm src/components/ui/badge-adapter.tsx
rm src/components/ui/card.tsx
rm src/components/ui/card-adapter.tsx

# 5-2. 기타 불필요한 레거시 파일 제거
# (사용하지 않는 ui 컴포넌트들 확인 후 제거)
```

### Phase 6: MigrationContext 단순화 (20min)
```typescript
// 6-1. 대부분의 Migration 로직 제거
interface SimplifiedMigrationContextType {
  // 레거시 호환성을 위한 최소한의 인터페이스만 유지
  isMigrated: (name: string) => boolean // 항상 true 반환
}

// 6-2. 또는 완전 제거 고려
// MigrationProvider 자체를 제거하고
// 직접 새 컴포넌트만 사용하도록 변경
```

### Phase 7: 최종 검증 및 최적화 (30분)
```bash
# 7-1. 린트 및 타입 체크
npm run lint
npx tsc --noEmit

# 7-2. 전체 빌드 테스트
npm run build

# 7-3. Bundle 분석 (최적화 효과 측정)
npx @next/bundle-analyzer

# 7-4. 성능 테스트
npm run start
# Lighthouse 점수 측정

# 7-5. 최종 기능 테스트
# 프로덕션 빌드에서 모든 페이지 동작 확인
```

---

## ⚠️ 리스크 분석 및 대응 방안 (검증 결과 반영)

### ⭐ 전체 리스크 등급: MEDIUM RISK (검증 완료)
- **평가 근거**: 사전 조치로 대부분 위험 요소 해결 가능
- **핵심 발견**: Badge/Card 컴포넌트 미완성 마이그레이션 상태
- **권장사항**: Phase 0 사전 준비 필수 완료 후 실행

### High Risk (사전 조치로 MEDIUM으로 완화됨)
1. **Badge 컴포넌트 마이그레이션 불완전** ⚠️ **새로 발견**
   - **위험**: 어댑터 존재하나 비활성화 상태
   - **영향**: Badge 사용처(10+ 파일)에서 갑작스런 UI 변경
   - **대응**: Phase 0에서 어댑터 활성화 필수
   - **검증**: `grep -q "badge-adapter" src/components/ui/badge.tsx`

2. **Card 컴포넌트 어댑터 부재** 🚨 **새로 발견**
   - **위험**: 어댑터 자체가 존재하지 않음
   - **영향**: Card 사용처(5+ 파일)에서 직접적 타입 에러
   - **대응**: Phase 0에서 Card 어댑터 생성 필수
   - **검증**: `[ -f "src/components/ui/card-adapter.tsx" ]`

3. **빌드 환경 이슈** ⚠️ **환경적 위험**
   - **위험**: Windows 권한 문제로 .next/trace 파일 접근 오류
   - **영향**: 빌드 검증 단계에서 실패 가능성
   - **대응**: Phase 0에서 .next 폴더 정리 필수
   - **검증**: `[ ! -d ".next" ]`

### Medium Risk (기존 위험 요소)
4. **타입 에러**
   - **위험**: Props 인터페이스 불일치
   - **대응**: 단계별 TypeScript 컴파일 확인
   - **롤백**: `git checkout legacy-cleanup-backup`

5. **런타임 에러**  
   - **위험**: 컴포넌트 참조 에러
   - **대응**: 개발 서버에서 실시간 확인
   - **롤백**: 즉시 이전 커밋으로 복구

6. **스타일 불일치**
   - **위험**: 레거시와 신규 컴포넌트 스타일 차이
   - **대응**: 각 페이지별 UI 검증
   - **롤백**: 개별 컴포넌트 단위 복구

### Low Risk  
7. **ESLint 미설정** ⚠️ **새로 발견**
   - **위험**: 린트 규칙 미적용으로 코드 품질 검증 불가
   - **대응**: Phase 0에서 ESLint Strict 설정 완료
   - **검증**: `npm run lint --dry-run`

8. **번들 크기 증가**
   - **위험**: 예상과 다른 결과 (낮은 가능성)
   - **대응**: Bundle Analyzer로 실시간 모니터링
   - **롤백**: 최적화 전 상태로 복구

9. **개발자 경험**
   - **위험**: Import 경로 혼란
   - **대응**: 문서화 및 가이드 업데이트
   - **롤백**: IDE 설정 조정

---

## 🔄 롤백 계획

### 즉시 롤백 (Emergency)
```bash
# 심각한 에러 발생시
git reset --hard legacy-cleanup-backup
npm install
npm run dev
```

### 단계별 롤백 (Selective)
```bash
# 특정 단계만 되돌리기
git log --oneline
git revert <commit-hash>
```

### 부분 롤백 (Component-wise)
```bash
# 특정 컴포넌트만 복구
git checkout legacy-cleanup-backup -- src/components/ui/button.tsx
```

---

## 📋 검증 체크리스트

### 기능 검증
- [ ] 모든 페이지 정상 로딩
- [ ] 버튼 클릭 동작 정상
- [ ] 폼 제출 기능 정상  
- [ ] 테마 토글 동작 정상
- [ ] 포트폴리오 필터링 정상
- [ ] WebGL 갤러리 정상
- [ ] 반응형 레이아웃 정상

### 기술적 검증
- [ ] TypeScript 컴파일 성공
- [ ] ESLint 통과
- [ ] 빌드 성공
- [ ] Bundle 크기 감소 확인
- [ ] 성능 지표 개선 확인
- [ ] 브라우저 호환성 확인

### 코드 품질 검증
- [ ] 불필요한 import 제거
- [ ] 미사용 파일 제거
- [ ] 타입 안전성 확보
- [ ] 일관된 코딩 스타일
- [ ] 문서화 업데이트

---

## 📈 성과 측정 지표

### 정량적 지표
```typescript
interface CleanupMetrics {
  // 번들 크기
  bundleSize: {
    before: string // "2.3MB"
    after: string  // "1.8MB" 
    reduction: string // "22%"
  }
  
  // 파일 수
  fileCount: {
    removed: number // 15개 파일
    simplified: number // 3개 파일
  }
  
  // 코드 라인
  linesOfCode: {
    removed: number // 800 LOC
    added: number   // 50 LOC
    net: number     // -750 LOC
  }
  
  // 의존성
  imports: {
    legacyReferences: number // 0개
    newReferences: number    // 70개
  }
}
```

### 정성적 지표
- **개발자 경험**: Import 경로 명확화
- **유지보수성**: 단일 컴포넌트 시스템
- **타입 안전성**: 런타임 분기 제거
- **성능**: 불필요한 코드 제거

---

## 📝 실행 후 조치 사항

### 문서 업데이트
1. **CLAUDE.md**: 마이그레이션 완료 상태 반영
2. **README.md**: 컴포넌트 사용법 업데이트  
3. **컴포넌트 가이드**: 새로운 import 경로 명시

### 팀 공유
1. **변경 사항 정리**: 주요 변경점 요약
2. **마이그레이션 히스토리**: 성공 사례 문서화
3. **베스트 프랙티스**: 향후 유사 작업 가이드

### 모니터링
1. **성능 지표**: 지속적 모니터링 설정
2. **에러 추적**: 프로덕션 에러 모니터링
3. **사용자 피드백**: UI/UX 개선 사항 수집

---

## 🚀 실행 준비 상태 확인 (검증 결과 반영)

### ✅ 완료된 사전 조건
- [x] 모든 신규 컴포넌트 구현 완료 
- [x] 어댑터 시스템 기본 동작 확인 (Button)
- [x] 백업 브랜치 생성 계획 수립
- [x] 롤백 절차 문서화
- [x] 코드베이스 상태 분석 완료 (38개 파일, 70개 참조)

### 🟡 조건부 실행 조건 (Phase 0 필수)
- [ ] **Badge 어댑터 활성화** (HIGH PRIORITY)
  ```bash
  # 검증: grep -q "badge-adapter" src/components/ui/badge.tsx
  ```
- [ ] **Card 어댑터 생성** (HIGH PRIORITY)
  ```bash
  # 검증: [ -f "src/components/ui/card-adapter.tsx" ]
  ```
- [ ] **빌드 환경 정리** (MEDIUM PRIORITY)
  ```bash
  # 검증: [ ! -d "temp-project/.next" ]
  ```
- [ ] **ESLint 설정 완료** (MEDIUM PRIORITY)
  ```bash
  # 검증: npm run lint --dry-run 2>&1 | grep -q "✓"
  ```

### 🔲 추가 권한 확인
- [ ] 코드 변경 권한 확인
- [ ] 브랜치 생성 권한 확인  
- [ ] 배포 권한 확인 (필요시)
- [ ] 팀 동의 획득

### 🔧 환경 준비
- [ ] 개발 환경 설정 완료
- [ ] 테스트 도구 준비
- [ ] 성능 측정 도구 준비
- [ ] 에러 추적 시스템 확인

---

## 📋 실행 직전 최종 체크리스트 (검증 보고서 기반)

```bash
# 📍 Phase 0 완료 확인 명령어
cd temp-project

echo "🔍 Phase 0 사전 준비 상태 점검..."

# 1. 환경 정리 확인
[ ! -d ".next" ] && echo "✅ .next 정리됨" || echo "❌ .next 정리 필요"

# 2. ESLint 설정 확인  
npm run lint --dry-run 2>&1 | grep -q "✓" && echo "✅ ESLint 설정됨" || echo "❌ ESLint 설정 필요"

# 3. Badge 어댑터 확인
grep -q "badge-adapter" src/components/ui/badge.tsx && echo "✅ Badge 어댑터 활성" || echo "❌ Badge 어댑터 비활성"

# 4. Card 어댑터 확인
[ -f "src/components/ui/card-adapter.tsx" ] && echo "✅ Card 어댑터 존재" || echo "❌ Card 어댑터 생성 필요"

echo ""
echo "🎯 모든 체크가 ✅이면 Phase 1 실행 가능"
echo "❌ 항목이 있으면 Phase 0 사전 준비 먼저 완료 필요"
```

**⚡ Phase 0 완료 후 실행 명령어:**
```bash
# Phase 1 시작
git checkout -b legacy-cleanup-backup && git add . && git commit -m "Backup before cleanup"
git checkout main && git checkout -b legacy-cleanup
npm run build && echo "✅ 검증 완료 - 레거시 제거 시작 가능"
```

**🚨 실행 상태**: ⚠️ **조건부 승인** - Phase 0 사전 준비 완료 후 실행