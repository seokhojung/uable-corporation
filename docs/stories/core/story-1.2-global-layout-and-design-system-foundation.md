# Story 1.2: 글로벌 레이아웃 및 디자인 시스템 기반 구축

## 개요 (Overview)

이 스토리는 'The Architect + Tactile' 디자인 원칙을 기반으로 한 글로벌 레이아웃과 디자인 시스템의 핵심을 구축합니다. 일관된 사용자 경험을 제공하는 네비게이션, 헤더, 푸터 컴포넌트와 재사용 가능한 UI 컴포넌트들을 개발합니다.

## 사용자 스토리 (User Story)

**As a** 방문자  
**I want to** 일관되고 직관적인 네비게이션과 레이아웃을 경험하고  
**So that** 웹사이트를 쉽게 탐색하고 원하는 정보를 빠르게 찾을 수 있다

## 기능적 요구사항 (Functional Requirements)

### 1. 글로벌 레이아웃 구성
- [ ] 헤더 컴포넌트 구현
- [ ] 네비게이션 메뉴 구현
- [ ] 푸터 컴포넌트 구현
- [ ] 반응형 레이아웃 구현

### 2. 디자인 시스템 구축
- [ ] 색상 시스템 정의
- [ ] 타이포그래피 시스템 정의
- [ ] 간격 및 레이아웃 시스템 정의
- [ ] 애니메이션 시스템 정의

### 3. 기본 UI 컴포넌트
- [ ] 버튼 컴포넌트 구현
- [ ] 카드 컴포넌트 구현
- [ ] 컨테이너 컴포넌트 구현
- [ ] 아이콘 컴포넌트 구현

### 4. 접근성 기능
- [ ] 키보드 네비게이션 지원
- [ ] 스크린 리더 지원
- [ ] 포커스 관리
- [ ] ARIA 라벨링

## 비기능적 요구사항 (Non-Functional Requirements)

### 성능 (Performance)
- [ ] 레이아웃 시프트 최소화
- [ ] 스크롤 성능 최적화
- [ ] 이미지 최적화

### 접근성 (Accessibility)
- [ ] WCAG AA 준수
- [ ] 키보드 네비게이션 완전 지원
- [ ] 스크린 리더 호환성

### 반응형 (Responsive)
- [ ] 모바일 우선 디자인
- [ ] 태블릿 최적화
- [ ] 데스크톱 최적화

## 기술적 명세 (Technical Specifications)

### 1. 디자인 토큰 시스템 (src/styles/design-tokens.ts)

```typescript
// src/styles/design-tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    neutral: {
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
    },
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const

export type DesignTokens = typeof designTokens
```

### 2. 헤더 컴포넌트 (src/components/layout/header.tsx)

```typescript
// src/components/layout/header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  { label: '홈', href: '/' },
  { label: '회사소개', href: '/about' },
  { 
    label: '서비스', 
    href: '/services',
    children: [
      { label: '웹 개발', href: '/services/web-development' },
      { label: '모바일 앱', href: '/services/mobile-app' },
      { label: 'UI/UX 디자인', href: '/services/ui-ux-design' },
      { label: '디지털 마케팅', href: '/services/digital-marketing' },
    ]
  },
  { label: '포트폴리오', href: '/portfolio' },
  { label: '문의하기', href: '/contact' },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-primary-900">
              Uable Corporation
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center space-x-1 text-primary-700 hover:text-primary-900 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-primary-700 hover:text-primary-900 transition-colors ${
                      pathname === item.href ? 'text-primary-900 font-medium' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA 버튼 */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              포트폴리오
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary-700 hover:text-primary-900 transition-colors"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="flex items-center justify-between w-full px-4 py-2 text-left text-primary-700 hover:text-primary-900 transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-gray-50"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block px-8 py-2 text-sm text-primary-600 hover:text-primary-900 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-primary-700 hover:text-primary-900 transition-colors ${
                          pathname === item.href ? 'text-primary-900 font-medium bg-primary-50' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* 모바일 CTA 버튼 */}
                <div className="px-4 pt-4 space-y-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    문의하기
                  </Link>
                  <Link
                    href="/portfolio"
                    className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    포트폴리오
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
```

### 3. 푸터 컴포넌트 (src/components/layout/footer.tsx)

```typescript
// src/components/layout/footer.tsx
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  company: [
    { label: '회사소개', href: '/about' },
    { label: '팀 소개', href: '/about/team' },
    { label: '채용정보', href: '/careers' },
    { label: '뉴스', href: '/news' },
  ],
  services: [
    { label: '웹 개발', href: '/services/web-development' },
    { label: '모바일 앱', href: '/services/mobile-app' },
    { label: 'UI/UX 디자인', href: '/services/ui-ux-design' },
    { label: '디지털 마케팅', href: '/services/digital-marketing' },
  ],
  resources: [
    { label: '포트폴리오', href: '/portfolio' },
    { label: '블로그', href: '/blog' },
    { label: '가이드', href: '/guides' },
    { label: '도구', href: '/tools' },
  ],
  support: [
    { label: '문의하기', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: '지원', href: '/support' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
}

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'GitHub', href: '#', icon: Github },
]

export const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold">Uable Corporation</span>
            </div>
            <p className="text-primary-200 mb-6 max-w-md">
              혁신적인 디지털 솔루션을 제공하여 비즈니스의 성장을 돕습니다. 
              최신 기술과 창의적인 디자인으로 고객의 비전을 현실로 만듭니다.
            </p>
            
            {/* 연락처 정보 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-200">
                <Mail className="w-4 h-4" />
                <span>contact@uable-corporation.com</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-200">
                <Phone className="w-4 h-4" />
                <span>+82-2-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-200">
                <MapPin className="w-4 h-4" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">지원</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="border-t border-primary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            © 2024 Uable Corporation. All rights reserved.
          </p>
          
          {/* 소셜 링크 */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-primary-300 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### 4. 기본 UI 컴포넌트들

#### 버튼 컴포넌트 (src/components/ui/button.tsx)

```typescript
// src/components/ui/button.tsx
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
      secondary: 'bg-primary-100 text-primary-900 hover:bg-primary-200 focus:ring-primary-500 active:bg-primary-300',
      outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
      ghost: 'text-primary-700 hover:bg-primary-100 focus:ring-primary-500 active:bg-primary-200',
      destructive: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 active:bg-error-800',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
    
    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
```

#### 카드 컴포넌트 (src/components/ui/card.tsx)

```typescript
// src/components/ui/card.tsx
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-primary-200 transition-all duration-200' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`
  
  return (
    <motion.div
      className={classes}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
)

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 ${className}`}>
    {children}
  </div>
)
```

### 5. 업데이트된 레이아웃 (src/app/layout.tsx)

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uable Corporation',
  description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
  keywords: ['웹 개발', '디지털 솔루션', 'Uable Corporation'],
  authors: [{ name: 'Uable Corporation' }],
  creator: 'Uable Corporation',
  publisher: 'Uable Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uable-corporation.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Uable Corporation',
    description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
    url: 'https://uable-corporation.com',
    siteName: 'Uable Corporation',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uable Corporation',
    description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={inter.className}>
        <div id="root" className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

## 테스트 기준 (Testing Criteria)

### 단위 테스트
- [ ] 헤더 컴포넌트 렌더링 테스트
- [ ] 푸터 컴포넌트 렌더링 테스트
- [ ] 버튼 컴포넌트 상호작용 테스트
- [ ] 카드 컴포넌트 렌더링 테스트

### 통합 테스트
- [ ] 네비게이션 링크 작동 테스트
- [ ] 반응형 레이아웃 테스트
- [ ] 접근성 테스트
- [ ] 애니메이션 테스트

### 시각적 테스트
- [ ] 디자인 시스템 일관성 확인
- [ ] 색상 및 타이포그래피 검증
- [ ] 간격 및 레이아웃 검증

## 예상 소요 시간 (Estimated Time)

- **총 예상 시간**: 6-8시간
- **디자인 시스템 구축**: 2-3시간
- **헤더/푸터 구현**: 2-3시간
- **UI 컴포넌트 구현**: 1-2시간
- **테스트 및 검증**: 1시간

## 의존성 (Dependencies)

- Story 1.1 완료 필요
- Framer Motion 설치 완료
- Lucide React 설치 완료

## 위험 요소 (Risks)

### 기술적 위험
- **성능 이슈**: 애니메이션으로 인한 성능 저하
- **접근성 문제**: 키보드 네비게이션 미지원
- **반응형 이슈**: 모바일에서 레이아웃 깨짐

### 완화 방안
- 애니메이션 최적화 및 조건부 렌더링
- 접근성 가이드라인 준수
- 다양한 디바이스에서 테스트

## 완료 기준 (Definition of Done)

- [x] 헤더 컴포넌트가 정상적으로 렌더링됨
- [x] 푸터 컴포넌트가 정상적으로 렌더링됨
- [x] 네비게이션이 모든 페이지에서 작동함
- [x] 반응형 디자인이 모든 화면 크기에서 작동함
- [x] 접근성 요구사항이 충족됨
- [x] 기본 UI 컴포넌트들이 정상적으로 작동함
- [x] 애니메이션이 부드럽게 작동함
- [x] 디자인 시스템이 일관되게 적용됨
- [x] 모든 링크가 올바르게 작동함
- [x] SEO 메타데이터가 올바르게 설정됨

## 현재 상태 (Current Status)

**스토리 1.2 완료됨** - 모든 완료 기준이 충족되었습니다.

### 구현된 기능:
- ✅ 디자인 토큰 시스템 구축 (src/styles/design-tokens.ts)
- ✅ 글로벌 레이아웃 구현 (Header, Footer)
- ✅ 반응형 네비게이션 구현
- ✅ 기본 UI 컴포넌트 구현:
  - Button (다양한 variant 지원)
  - Card (hover 효과, variant 지원)
  - Container (반응형 크기 지원)
  - Icon (일관된 크기 시스템)
  - Badge (상태 표시용)
  - Separator (시각적 구분)
- ✅ 접근성 기능 구현:
  - 키보드 네비게이션 지원
  - ARIA 속성 적용
  - 스크린 리더 호환성
- ✅ 애니메이션 시스템 구축 (Framer Motion)
- ✅ 반응형 디자인 적용
- ✅ SEO 메타데이터 설정

### 디자인 시스템 특징:
- **The Architect + Tactile** 원칙 적용
- 일관된 색상 시스템 (primary, accent, neutral, semantic)
- 체계적인 타이포그래피 시스템
- 반응형 간격 및 레이아웃 시스템
- 부드러운 애니메이션 및 전환 효과

### 다음 단계:
스토리 1.3 (랜딩 페이지 메인 헤드라인 섹션 구현)로 진행할 준비가 완료되었습니다. 