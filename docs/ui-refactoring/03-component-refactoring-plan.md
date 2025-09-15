# 컴포넌트 리팩토링 계획

## 📋 현재 컴포넌트 분석

### 🔍 기존 컴포넌트 현황

#### UI 컴포넌트 (src/components/ui/)
| 컴포넌트 | 현재 상태 | 문제점 | 우선순위 |
|----------|-----------|---------|----------|
| Button | ⚠️ 부적절 | div 태그 사용, 타입 미흡 | 🔴 높음 |
| Badge | ⚠️ 개선 필요 | variant 동작 안함 | 🔴 높음 |
| Card | ⚠️ 개선 필요 | 접근성 문제 | 🔴 높음 |
| Modal | ✅ 양호 | - | 🟡 중간 |
| Container | ✅ 양호 | - | 🟢 낮음 |
| Charts (6개) | ✅ 양호 | 통합 필요 | 🟡 중간 |
| OptimizedImage | ✅ 양호 | - | 🟢 낮음 |
| Breadcrumb | ✅ 양호 | - | 🟢 낮음 |

#### 섹션 컴포넌트 (src/components/sections/)
| 컴포넌트 | 용도 | 리팩토링 필요도 |
|----------|------|-----------------|
| HeroSection | 메인 히어로 | 🟡 중간 |
| ProblemSection | 문제 제시 | 🟢 낮음 |
| SolutionSection | 솔루션 제시 | 🟢 낮음 |
| DifferentiatorsSection | 차별점 | 🟢 낮음 |

---

## 🎯 리팩토링 목표

### 핵심 개선 사항
1. **TypeScript 완전 지원**: 모든 props 타입 정의
2. **접근성 준수**: WCAG 2.1 AA 기준
3. **컴포넌트 표준화**: 일관된 API와 패턴
4. **성능 최적화**: 메모이제이션, 코드 스플리팅
5. **테스트 가능성**: 유닛/통합 테스트 작성

---

## 🔄 점진적 컴포넌트 리팩토링 계획

### 전략 개요: Zero-Risk Migration

#### 병행 개발 접근법
```
기존 유지              새로운 개발              점진적 전환
├── ui/button.tsx  →  ├── primitives/Button/  →  ├── 기존 API 유지
├── 레거시 지원       ├── 새로운 표준           ├── Feature Flag
└── 무중단 운영       └── 향상된 기능           └── 단계적 교체
```

### 1. Button 컴포넌트 점진적 전환

#### 현재 문제점 분석
```typescript
// ❌ 기존 구현 (src/components/ui/button.tsx)
<div className={classes}>{children}</div>
// 문제: div 태그, 접근성 부족, 타입 미흡
```

#### 3단계 점진적 개선 방안

##### 1단계: 새 컴포넌트 병행 개발
```typescript
// ✅ 새 구현 (src/components/primitives/Button/Button.tsx)
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-slate-600 text-slate-100 hover:bg-slate-500 focus-visible:ring-slate-400',
        tertiary: 'bg-transparent text-slate-300 hover:bg-slate-700 hover:text-slate-100',
        ghost: 'hover:bg-slate-700 hover:text-slate-100 focus-visible:ring-slate-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        outline: 'border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm', 
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface NewButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const NewButton = forwardRef<HTMLButtonElement, NewButtonProps>(
  ({ className, variant, size, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner className="mr-2" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

NewButton.displayName = 'NewButton';
export { NewButton, buttonVariants };
```

##### 2단계: Adapter 패턴으로 기존 API 보장
```typescript
// 📝 기존 파일 수정 (src/components/ui/button.tsx)
import { NewButton } from '@/components/primitives/Button';
import { useMigrationContext } from '@/contexts/MigrationContext';

// 레거시 API 매핑
const mapLegacyProps = (props: LegacyButtonProps): NewButtonProps => {
  const { size, variant, ...rest } = props;
  
  return {
    size: size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md',
    variant: variant, // 기본적으로 호환
    ...rest
  };
};

// 기존 컴포넌트 (하위 호환성 유지)
export const Button = (props: LegacyButtonProps) => {
  const { migratedComponents } = useMigrationContext();
  const useNewButton = migratedComponents.has('Button') || 
                      process.env.NEXT_PUBLIC_NEW_UI === 'true';
  
  if (useNewButton) {
    const mappedProps = mapLegacyProps(props);
    return <NewButton {...mappedProps} />;
  }
  
  // 레거시 구현 (점진적 제거 예정)
  return <LegacyButtonImplementation {...props} />;
};
```

##### 3단계: 점진적 전환 및 모니터링
```typescript
// Migration Context로 전역 제어
const MigrationContext = createContext({
  migratedComponents: new Set<string>(),
  migrateComponent: (name: string) => void,
  rollbackComponent: (name: string) => void,
});

// 사용 예시 - 페이지별 점진적 적용
const HomePage = () => {
  const { migrateComponent } = useMigrationContext();
  
  useEffect(() => {
    // 트래픽 낮은 시간에 점진적 전환
    if (process.env.NODE_ENV === 'development') {
      migrateComponent('Button');
    }
  }, []);
  
  return (
    <div>
      <Button variant="primary">여전히 기존 API 사용</Button>
    </div>
  );
};
```

### 2. Badge 컴포넌트 점진적 전환

#### 현재 문제점
```typescript
// ❌ 기존 Badge 구현
const variants = {
  primary: 'bg-slate-600 text-slate-200',    // 모두 동일한 스타일
  secondary: 'bg-slate-600 text-slate-200',  // 차이가 없음
  success: 'bg-slate-600 text-slate-200',    // 색상 구분 안됨
}
```

#### 점진적 개선 접근
```typescript
// ✅ 새 Badge 구현 (src/components/primitives/Badge/Badge.tsx)
const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-slate-700 text-slate-200',
        primary: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
        secondary: 'bg-slate-600/20 text-slate-300 border border-slate-600/30',
        success: 'bg-green-600/20 text-green-400 border border-green-600/30',
        warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30',
        error: 'bg-red-600/20 text-red-400 border border-red-600/30',
        outline: 'border border-slate-600 text-slate-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Adapter 패턴 적용 (src/components/ui/badge.tsx)
export const Badge = (props: LegacyBadgeProps) => {
  const { migratedComponents } = useMigrationContext();
  
  if (migratedComponents.has('Badge')) {
    return <NewBadge {...props} />; // 1:1 호환 가능
  }
  
  return <LegacyBadgeImplementation {...props} />;
};
```

### 3. Card 컴포넌트 점진적 전환

#### 현재 문제점
```typescript
// ❌ 기존 Card 구현
<Card className="..." onClick={onClick} role="button" tabIndex={0}>
  {/* 접근성 문제: div에 button role */}
  {/* 키보드 이벤트 불완전 구현 */}
</Card>
```

#### 점진적 개선 계획
```typescript
// ✅ 새 Card 구현 (src/components/primitives/Card/Card.tsx)
interface NewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  asButton?: boolean; // 접근성 개선
}

const Card = forwardRef<HTMLDivElement, NewCardProps>(
  ({ className, variant = 'default', padding = 'md', interactive = false, asButton = false, children, onClick, ...props }, ref) => {
    
    // 접근성 개선: 실제 button 또는 올바른 ARIA
    if (asButton && onClick) {
      return (
        <button
          ref={ref as any}
          className={cn(cardVariants({ variant, padding }), 'text-left', className)}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding }),
          interactive && 'cursor-pointer hover:-translate-y-1',
          onClick && 'focus:outline-none focus:ring-2 focus:ring-blue-500',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e as any);
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Compound Components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Adapter로 기존 API 유지
export const LegacyCard = (props: LegacyCardProps) => {
  const { migratedComponents } = useMigrationContext();
  
  if (migratedComponents.has('Card')) {
    // 기존 interactive prop을 asButton으로 매핑
    const mappedProps = {
      ...props,
      asButton: props.onClick && props.interactive,
    };
    return <Card {...mappedProps} />;
  }
  
  return <OriginalCard {...props} />;
};
```

### 4. Input 컴포넌트 (신규)

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || useId();
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
```

### 5. Select 컴포넌트 (신규)

```typescript
// Radix UI 기반 Select 컴포넌트
import * as SelectPrimitive from '@radix-ui/react-select';

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm',
      'focus:outline-none focus:ring-2 focus:ring-blue-500',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
));
```

---

## 📦 컴포넌트 구조 개선

### 새로운 폴더 구조
```
src/components/
├── primitives/          # 기본 컴포넌트
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Select/
│   ├── Badge/
│   └── ...
├── compounds/          # 복합 컴포넌트
│   ├── Card/
│   ├── Modal/
│   ├── Dropdown/
│   └── ...
├── patterns/          # UI 패턴
│   ├── Form/
│   ├── DataTable/
│   ├── Gallery/
│   └── ...
└── index.ts          # 전체 export
```

### 컴포넌트 템플릿
```typescript
// Component.tsx
export interface ComponentProps { }
export const Component = forwardRef<HTMLElement, ComponentProps>(() => {});

// Component.test.tsx
describe('Component', () => {
  it('should render correctly', () => {});
});

// Component.stories.tsx
export default {
  title: 'Primitives/Component',
  component: Component,
};

// index.ts
export { Component } from './Component';
export type { ComponentProps } from './Component';
```

---

## 🧪 테스트 전략

### 테스트 범위
1. **Unit Tests**: 개별 컴포넌트 동작
2. **Integration Tests**: 컴포넌트 조합
3. **Visual Tests**: Storybook + Chromatic
4. **Accessibility Tests**: jest-axe

### 테스트 예제
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 📈 성능 최적화

### 최적화 전략
1. **메모이제이션**: React.memo, useMemo, useCallback
2. **코드 스플리팅**: 동적 import
3. **번들 최적화**: Tree shaking
4. **레이지 로딩**: Intersection Observer

### 예제
```typescript
// 메모이제이션
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

// 동적 import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

---

## 📊 진행 추적

### Phase 1: 핵심 컴포넌트 (Week 1)
- [ ] Button 리팩토링
- [ ] Badge 리팩토링
- [ ] Card 리팩토링
- [ ] Input 신규 개발
- [ ] Select 신규 개발

### Phase 2: 복합 컴포넌트 (Week 2)
- [ ] Modal 개선
- [ ] Dropdown 신규
- [ ] Tabs 신규
- [ ] Accordion 신규
- [ ] Toast 신규

### Phase 3: 패턴 컴포넌트 (Week 3)
- [ ] Form 패턴
- [ ] DataTable 패턴
- [ ] Gallery 패턴
- [ ] Dashboard 레이아웃

### Phase 4: 통합 및 마이그레이션 (Week 4)
- [ ] 레거시 코드 마이그레이션
- [ ] 테스트 작성
- [ ] 문서화
- [ ] 성능 최적화

---

## ✅ 체크리스트

### 컴포넌트 개발 체크리스트
- [ ] TypeScript 타입 완전 정의
- [ ] forwardRef 구현
- [ ] ARIA 속성 추가
- [ ] 키보드 네비게이션 지원
- [ ] 테스트 코드 작성 (coverage > 80%)
- [ ] Storybook 스토리 작성
- [ ] 문서화 (JSDoc)
- [ ] 성능 최적화
- [ ] 다크/라이트 테마 지원
- [ ] 반응형 디자인

---

*작성일: 2024-12-30*
*버전: 1.0.0*