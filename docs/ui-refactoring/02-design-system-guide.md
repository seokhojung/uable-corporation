# 디자인 시스템 가이드

## 📚 개요
Uable Corporation의 일관되고 확장 가능한 UI를 위한 디자인 시스템 가이드입니다.

---

## 🎨 디자인 원칙

### 1. Clarity (명확성)
- 정보 위계가 명확해야 함
- 사용자의 다음 행동이 예측 가능해야 함
- 불필요한 요소를 제거하여 핵심에 집중

### 2. Consistency (일관성)
- 동일한 패턴은 동일한 방식으로 작동
- 시각적 언어의 통일성 유지
- 예측 가능한 사용자 경험 제공

### 3. Efficiency (효율성)
- 최소한의 클릭으로 목표 달성
- 빠른 로딩과 반응
- 재사용 가능한 컴포넌트

### 4. Accessibility (접근성)
- 모든 사용자가 이용 가능
- WCAG 2.1 AA 기준 준수
- 키보드 네비게이션 완벽 지원

---

## 🏗️ 디자인 토큰

### 색상 시스템

#### 1. 원시 색상 (Primitive Colors)
```typescript
const primitiveColors = {
  // Gray Scale
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Blue (Primary)
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Status Colors
  green: { /* Success */ },
  yellow: { /* Warning */ },
  red: { /* Error */ },
  purple: { /* Accent */ },
}
```

#### 2. 의미론적 색상 (Semantic Colors)
```typescript
const semanticColors = {
  // Background
  background: {
    primary: primitiveColors.gray[900],    // 메인 배경
    secondary: primitiveColors.gray[800],  // 카드 배경
    tertiary: primitiveColors.gray[700],   // 호버 배경
    overlay: 'rgba(0, 0, 0, 0.5)',        // 오버레이
  },
  
  // Text
  text: {
    primary: primitiveColors.gray[50],     // 메인 텍스트
    secondary: primitiveColors.gray[300],  // 서브 텍스트
    tertiary: primitiveColors.gray[400],   // 보조 텍스트
    disabled: primitiveColors.gray[500],   // 비활성 텍스트
    inverse: primitiveColors.gray[900],    // 반전 텍스트
  },
  
  // Border
  border: {
    default: primitiveColors.gray[700],
    hover: primitiveColors.gray[600],
    focus: primitiveColors.blue[500],
    error: primitiveColors.red[500],
  },
  
  // Status
  status: {
    info: primitiveColors.blue[500],
    success: primitiveColors.green[500],
    warning: primitiveColors.yellow[500],
    error: primitiveColors.red[500],
  },
}
```

### 타이포그래피

#### 1. 폰트 시스템
```typescript
const typography = {
  // Font Families
  fontFamily: {
    display: '"Poppins", "Pretendard", sans-serif',
    body: '"Inter", "Pretendard", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  
  // Font Sizes (rem)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  
  // Font Weights
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}
```

#### 2. 텍스트 스타일
```typescript
const textStyles = {
  // Headings
  h1: {
    fontFamily: typography.fontFamily.display,
    fontSize: { base: '2.25rem', md: '3rem', lg: '3.75rem' },
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontFamily: typography.fontFamily.display,
    fontSize: { base: '1.875rem', md: '2.25rem' },
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  // ... h3, h4, h5, h6
  
  // Body
  body: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
  },
  
  // Components
  button: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'none',
  },
}
```

### 스페이싱 시스템

#### 8px 그리드
```typescript
const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px - 기본 단위
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
}
```

### 레이아웃

#### 1. 브레이크포인트
```typescript
const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

#### 2. 컨테이너
```typescript
const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  
  padding: {
    mobile: spacing[4],  // 16px
    tablet: spacing[6],  // 24px
    desktop: spacing[8], // 32px
  },
}
```

#### 3. 그리드
```typescript
const grid = {
  columns: 12,
  gap: {
    sm: spacing[4],  // 16px
    md: spacing[6],  // 24px
    lg: spacing[8],  // 32px
  },
}
```

### 그림자 시스템

```typescript
const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // 글래스모피즘용
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  
  // 컬러 그림자
  primary: '0 10px 25px -3px rgba(59, 130, 246, 0.3)',
  success: '0 10px 25px -3px rgba(34, 197, 94, 0.3)',
  error: '0 10px 25px -3px rgba(239, 68, 68, 0.3)',
}
```

### 모서리 반경

```typescript
const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // 완전 둥근
}
```

### 애니메이션

#### 1. 트랜지션
```typescript
const transitions = {
  // Duration
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  // Timing Functions
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Properties
  property: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  },
}
```

#### 2. 키프레임 애니메이션
```typescript
const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },
}
```

---

## 🧩 컴포넌트 스펙

### 기본 컴포넌트 인터페이스
```typescript
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
}
```

### 변형 시스템 (Variants)
```typescript
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
type Status = 'default' | 'info' | 'success' | 'warning' | 'error';
```

---

## 📐 레이아웃 패턴

### 1. Container
```css
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--container-padding);
  padding-left: var(--container-padding);
  max-width: var(--container-max-width);
}
```

### 2. Grid System
```css
.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
}
```

### 3. Flex Patterns
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---

## 🎯 사용 가이드라인

### Do's ✅
1. 디자인 토큰을 일관되게 사용
2. 의미론적 색상 사용 (semantic colors)
3. 8px 그리드 시스템 준수
4. 접근성 속성 필수 포함
5. 반응형 디자인 우선

### Don'ts ❌
1. 하드코딩된 값 사용 금지
2. 인라인 스타일 최소화
3. !important 사용 자제
4. 임의의 색상값 사용 금지
5. 비표준 애니메이션 사용 자제

---

## 🔧 구현 예제

### CSS Variables 설정
```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-text-primary: #f1f5f9;
  
  /* Typography */
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-unit: 0.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

### Tailwind Config 확장
```javascript
module.exports = {
  theme: {
    extend: {
      colors: primitiveColors,
      fontFamily: typography.fontFamily,
      spacing: spacing,
      // ...
    },
  },
}
```

---

*작성일: 2024-12-30*
*버전: 1.0.0*