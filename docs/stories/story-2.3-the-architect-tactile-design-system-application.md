# Story 2.3: 'The Architect + Tactile' 디자인 시스템 적용

## 개요 (Overview)
포트폴리오 기능에 'The Architect + Tactile' 디자인 시스템을 완전히 적용하여 일관된 시각적 경험과 브랜드 정체성을 구현합니다. 이 스토리는 포트폴리오 페이지들이 회사의 핵심 디자인 원칙을 반영하도록 보장합니다.

## 기능적 요구사항 (Functional Requirements)

### 디자인 시스템 통합
- **색상 팔레트 적용**: 모노톤 기반 색상 체계 완전 적용
- **타이포그래피**: Inter 폰트 패밀리와 계층적 텍스트 스타일 적용
- **간격 시스템**: 일관된 spacing scale 적용
- **그림자 시스템**: 계층적 depth 표현을 위한 shadow scale 적용

### 포트폴리오 전용 컴포넌트
- **PortfolioCard**: 그리드/리스트 뷰를 지원하는 카드 컴포넌트
- **PortfolioFilters**: 필터링 및 검색 기능을 위한 컴포넌트
- **ProjectGallery**: 이미지, 비디오, 3D 모델을 위한 갤러리 컴포넌트
- **TechnologyStack**: 기술 스택을 시각적으로 표현하는 컴포넌트
- **ProjectTimeline**: 프로젝트 진행 과정을 타임라인으로 표시
- **AchievementMetrics**: 성과 지표를 시각적으로 표현

### 인터랙션 및 애니메이션
- **호버 효과**: 카드 및 버튼의 미묘한 호버 애니메이션
- **페이지 전환**: 포트폴리오 페이지 간 부드러운 전환
- **로딩 상태**: 스켈레톤 로딩 및 스피너 애니메이션
- **스크롤 애니메이션**: 스크롤 기반 요소 등장 애니메이션

### 반응형 디자인 시스템
- **브레이크포인트**: 모바일, 태블릿, 데스크톱, 대형 화면
- **그리드 시스템**: 유연한 그리드 레이아웃
- **컨테이너**: 반응형 컨테이너 및 패딩 시스템

## 비기능적 요구사항 (Non-Functional Requirements)

### 시각적 일관성 (Visual Consistency)
- **브랜드 정체성**: 회사의 전문적이고 혁신적인 이미지 반영
- **색상 일관성**: 모든 포트폴리오 요소에서 일관된 색상 사용
- **타이포그래피 일관성**: 계층적이고 읽기 쉬운 텍스트 구조
- **간격 일관성**: 모든 요소 간 일관된 간격 유지

### 사용자 경험 (User Experience)
- **직관적 네비게이션**: 명확하고 예측 가능한 인터랙션
- **시각적 피드백**: 모든 사용자 액션에 대한 즉각적인 피드백
- **접근성**: WCAG AA 기준을 충족하는 접근성 디자인
- **성능**: 빠른 로딩과 부드러운 애니메이션

### 브랜드 커뮤니케이션
- **전문성**: 기술적 역량을 강조하는 시각적 표현
- **혁신성**: 최신 기술 트렌드를 반영하는 디자인
- **신뢰성**: 안정적이고 신뢰할 수 있는 브랜드 이미지
- **접근성**: 복잡한 기술을 이해하기 쉽게 시각화

## 기술적 세부사항 (Technical Details)

### 디자인 토큰 시스템
```typescript
// design-tokens/portfolio.ts
export const portfolioTokens = {
  colors: {
    // 모노톤 기반 색상 팔레트
    primary: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
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
    '5xl': '8rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  animation: {
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
    }
  }
}
```

### 포트폴리오 전용 컴포넌트 시스템
```typescript
// components/portfolio/portfolio-card-enhanced.tsx
import { motion } from 'framer-motion'
import { Calendar, Users, ExternalLink, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/ui/optimized-image'
import type { PortfolioProject } from '@/types/portfolio'

interface PortfolioCardEnhancedProps {
  project: PortfolioProject
  viewMode: 'grid' | 'list'
  index: number
}

const categoryLabels = {
  '3d-visualization': '3D 시각화',
  'ar-vr': 'AR/VR',
  'webxr': 'WebXR',
  'web-development': '웹 개발'
}

const PortfolioCardEnhanced = ({ project, viewMode, index }: PortfolioCardEnhancedProps) => {
  const isListMode = viewMode === 'list'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        isListMode ? 'flex' : ''
      }`}
    >
      {/* 썸네일 */}
      <div className={`relative overflow-hidden ${
        isListMode ? 'w-1/3' : 'w-full'
      }`}>
        <OptimizedImage
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={project.thumbnail.width}
          height={project.thumbnail.height}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 배지 */}
        <div className="absolute top-4 left-4 flex gap-2">
          {project.featured && (
            <Badge variant="accent" className="bg-accent-600 text-white shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              추천
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-primary-900 shadow-lg">
            {categoryLabels[project.category]}
          </Badge>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className={`p-6 ${
        isListMode ? 'w-2/3' : ''
      }`}>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-primary-600 text-sm mb-4 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* 기술 스택 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary" className="text-xs bg-primary-100 text-primary-700">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-700">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="flex items-center gap-4 text-sm text-primary-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{project.duration.start} - {project.duration.end}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.teamSize}명</span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-primary-900 hover:bg-primary-800 text-white transition-colors duration-300"
          >
            자세히 보기
          </Button>
          {project.externalLinks.demo && (
            <Button 
              size="sm" 
              variant="secondary" 
              className="flex items-center gap-1 border-primary-200 hover:border-primary-300 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              데모
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioCardEnhanced
```

### 향상된 필터 컴포넌트
```typescript
// components/portfolio/portfolio-filters-enhanced.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { PortfolioFilters } from '@/types/portfolio'

interface PortfolioFiltersEnhancedProps {
  filters: PortfolioFilters
  onFiltersChange: (filters: PortfolioFilters) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

const categories = [
  { value: '3d-visualization', label: '3D 시각화', icon: '🎨' },
  { value: 'ar-vr', label: 'AR/VR', icon: '🥽' },
  { value: 'webxr', label: 'WebXR', icon: '🌐' },
  { value: 'web-development', label: '웹 개발', icon: '💻' }
]

const technologies = [
  { value: 'Three.js', label: 'Three.js', color: 'bg-blue-100 text-blue-800' },
  { value: 'React', label: 'React', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'Unity', label: 'Unity', color: 'bg-gray-100 text-gray-800' },
  { value: 'WebXR', label: 'WebXR', color: 'bg-purple-100 text-purple-800' },
  { value: 'AR.js', label: 'AR.js', color: 'bg-green-100 text-green-800' },
  { value: 'TypeScript', label: 'TypeScript', color: 'bg-blue-100 text-blue-800' },
  { value: 'WebGL', label: 'WebGL', color: 'bg-orange-100 text-orange-800' },
  { value: 'Framer Motion', label: 'Framer Motion', color: 'bg-pink-100 text-pink-800' },
  { value: 'Tailwind CSS', label: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800' },
  { value: 'Next.js', label: 'Next.js', color: 'bg-black text-white' }
]

const PortfolioFiltersEnhanced = ({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange
}: PortfolioFiltersEnhancedProps) => {
  const [showFilters, setShowFilters] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showTechnologies, setShowTechnologies] = useState(false)

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    })
  }

  const handleTechnologyChange = (tech: string) => {
    const currentTechs = filters.technologies || []
    const newTechs = currentTechs.includes(tech)
      ? currentTechs.filter(t => t !== tech)
      : [...currentTechs, tech]
    
    onFiltersChange({
      ...filters,
      technologies: newTechs.length > 0 ? newTechs : undefined
    })
  }

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search || undefined
    })
  }

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? undefined : sortBy as any
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = filters.category || filters.technologies?.length || filters.search

  return (
    <div className="mb-8">
      {/* 상단 필터 바 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-primary-100"
      >
        {/* 검색 */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* 뷰 모드 토글 */}
        <div className="flex items-center gap-2 bg-primary-50 rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('grid')}
            className={`transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('list')}
            className={`transition-all duration-300 ${
              viewMode === 'list' 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* 필터 토글 */}
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 border-primary-200 transition-colors duration-300"
        >
          <Filter className="w-4 h-4" />
          필터
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
            showFilters ? 'rotate-180' : ''
          }`} />
        </Button>
      </motion.div>

      {/* 활성 필터 표시 */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200"
          >
            <span className="text-sm font-medium text-accent-800">활성 필터:</span>
            {filters.category && (
              <Badge variant="accent" className="flex items-center gap-1 bg-accent-600 text-white">
                {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleCategoryChange(filters.category!)}
                  className="ml-1 hover:bg-accent-700 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.technologies?.map(tech => (
              <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                {tech}
                <button
                  onClick={() => handleTechnologyChange(tech)}
                  className="ml-1 hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <Button size="sm" variant="ghost" onClick={clearFilters} className="text-accent-700 hover:text-accent-800">
              모두 지우기
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 확장된 필터 패널 */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-primary-100"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* 카테고리 필터 */}
              <div>
                <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-600 rounded-full"></span>
                  카테고리
                </h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.category === category.value}
                        onChange={() => handleCategoryChange(category.value)}
                        className="rounded border-primary-300 text-accent-600 focus:ring-accent-500 transition-colors"
                      />
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm text-primary-700 group-hover:text-primary-900 transition-colors">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 기술 스택 필터 */}
              <div>
                <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-600 rounded-full"></span>
                  기술 스택
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {technologies.map(tech => (
                    <label key={tech.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.technologies?.includes(tech.value) || false}
                        onChange={() => handleTechnologyChange(tech.value)}
                        className="rounded border-primary-300 text-accent-600 focus:ring-accent-500 transition-colors"
                      />
                      <span className={`text-xs px-2 py-1 rounded-full ${tech.color} group-hover:opacity-80 transition-opacity`}>
                        {tech.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 정렬 옵션 */}
              <div>
                <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-600 rounded-full"></span>
                  정렬
                </h4>
                <div className="space-y-3">
                  {[
                    { value: 'newest', label: '최신순', icon: '🆕' },
                    { value: 'oldest', label: '오래된순', icon: '📅' },
                    { value: 'featured', label: '추천순', icon: '⭐' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="sort"
                        checked={filters.sortBy === option.value}
                        onChange={() => handleSortChange(option.value)}
                        className="border-primary-300 text-accent-600 focus:ring-accent-500 transition-colors"
                      />
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm text-primary-700 group-hover:text-primary-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioFiltersEnhanced
```

### 기술 스택 시각화 컴포넌트
```typescript
// components/portfolio/technology-stack.tsx
import { motion } from 'framer-motion'
import { Code, Zap, Database, Globe, Smartphone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { PortfolioProject } from '@/types/portfolio'

interface TechnologyStackProps {
  project: PortfolioProject
}

const technologyCategories = {
  'frontend': { label: '프론트엔드', icon: Code, color: 'bg-blue-100 text-blue-800' },
  'backend': { label: '백엔드', icon: Database, color: 'bg-green-100 text-green-800' },
  '3d': { label: '3D/그래픽스', icon: Globe, color: 'bg-purple-100 text-purple-800' },
  'mobile': { label: '모바일', icon: Smartphone, color: 'bg-orange-100 text-orange-800' },
  'performance': { label: '성능 최적화', icon: Zap, color: 'bg-red-100 text-red-800' }
}

const technologyMapping = {
  'React': { category: 'frontend', description: '사용자 인터페이스 구축을 위한 JavaScript 라이브러리' },
  'TypeScript': { category: 'frontend', description: '타입 안정성을 제공하는 JavaScript 상위 집합' },
  'Next.js': { category: 'frontend', description: 'React 기반의 풀스택 웹 프레임워크' },
  'Three.js': { category: '3d', description: 'WebGL을 기반으로 한 3D 그래픽스 라이브러리' },
  'WebGL': { category: '3d', description: '웹 브라우저에서 3D 그래픽을 렌더링하는 API' },
  'Unity': { category: '3d', description: '게임 및 3D 애플리케이션 개발 플랫폼' },
  'WebXR': { category: '3d', description: '웹에서 VR/AR 경험을 구현하는 API' },
  'AR.js': { category: '3d', description: '웹 브라우저에서 AR 경험을 구현하는 라이브러리' },
  'Framer Motion': { category: 'frontend', description: 'React 애니메이션 라이브러리' },
  'Tailwind CSS': { category: 'frontend', description: '유틸리티 우선 CSS 프레임워크' }
}

const TechnologyStack = ({ project }: TechnologyStackProps) => {
  const categorizedTechnologies = project.technologies.reduce((acc, tech) => {
    const techInfo = technologyMapping[tech as keyof typeof technologyMapping]
    if (techInfo) {
      const category = techInfo.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push({ name: tech, ...techInfo })
    }
    return acc
  }, {} as Record<string, Array<{ name: string; description: string }>>)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary-900">기술 스택</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {Object.entries(categorizedTechnologies).map(([category, technologies], index) => {
          const categoryInfo = technologyCategories[category as keyof typeof technologyCategories]
          const Icon = categoryInfo.icon

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${categoryInfo.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900">{categoryInfo.label}</h3>
              </div>
              
              <div className="space-y-3">
                {technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: techIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-white text-primary-900 border-primary-200">
                        {tech.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary-600 leading-relaxed">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 기술 스택 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-xl border border-accent-200"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">기술 선택 이유</h3>
        <p className="text-primary-600 leading-relaxed">
          각 기술은 프로젝트의 특정 요구사항과 성능 목표를 고려하여 선택되었습니다. 
          최신 웹 표준과 성능 최적화를 우선시하여 사용자에게 최고의 경험을 제공합니다.
        </p>
      </motion.div>
    </div>
  )
}

export default TechnologyStack
```

### 성과 지표 컴포넌트
```typescript
// components/portfolio/project-achievements.tsx
import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, Target } from 'lucide-react'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectAchievementsProps {
  project: PortfolioProject
}

const ProjectAchievements = ({ project }: ProjectAchievementsProps) => {
  const achievementIcons = {
    '성능': TrendingUp,
    '사용자': Users,
    '품질': Award,
    '목표': Target
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary-900">프로젝트 성과</h2>
      
      {/* 성과 카드 그리드 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.achievements.map((achievement, index) => {
          // 성과 유형에 따른 아이콘 선택
          let icon = TrendingUp
          if (achievement.includes('사용자') || achievement.includes('고객')) {
            icon = Users
          } else if (achievement.includes('성능') || achievement.includes('속도')) {
            icon = TrendingUp
          } else if (achievement.includes('만족') || achievement.includes('품질')) {
            icon = Award
          } else if (achievement.includes('목표') || achievement.includes('달성')) {
            icon = Target
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors duration-300">
                  <icon className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900">성과 {index + 1}</h3>
              </div>
              <p className="text-primary-600 leading-relaxed">
                {achievement}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* 성과 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-900 to-primary-800 text-white p-8 rounded-xl"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">
              {project.teamSize}
            </div>
            <div className="text-sm text-primary-200">팀 구성원</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">
              {project.achievements.length}
            </div>
            <div className="text-sm text-primary-200">주요 성과</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">
              {project.technologies.length}
            </div>
            <div className="text-sm text-primary-200">사용 기술</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectAchievements
```

## 테스트 기준 (Testing Criteria)

### 디자인 시스템 테스트
- **색상 일관성**: 모든 컴포넌트에서 일관된 색상 사용 확인
- **타이포그래피**: 폰트 패밀리와 크기 계층 구조 확인
- **간격 시스템**: 모든 요소 간 일관된 간격 적용 확인
- **그림자 시스템**: 계층적 depth 표현 확인

### 컴포넌트 테스트
- **반응형 디자인**: 모든 브레이크포인트에서 레이아웃 확인
- **애니메이션**: 호버 효과 및 전환 애니메이션 확인
- **접근성**: WCAG AA 기준 충족 확인
- **성능**: 애니메이션 성능 및 메모리 사용량 확인

### 브랜드 일관성 테스트
- **시각적 정체성**: 회사 브랜드 이미지와 일치성 확인
- **사용자 경험**: 직관적이고 일관된 인터랙션 확인
- **전문성**: 기술적 역량을 강조하는 디자인 확인

## 예상 소요 시간 (Estimated Time)
- **개발**: 3-4일
- **테스트**: 1일
- **총 소요 시간**: 4-5일

## 의존성 (Dependencies)
- Story 2.1: 포트폴리오 데이터 구조 정의 및 목록 페이지 기본 구현
- Story 2.2: 동적 상세 페이지 구현 및 라우팅

## 위험 요소 (Risks)
- **디자인 일관성**: 다양한 컴포넌트 간 일관성 유지의 어려움
- **성능**: 복잡한 애니메이션으로 인한 성능 저하
- **접근성**: 시각적 효과와 접근성 간의 균형
- **브랜드 정체성**: 기술적 전문성과 접근성 간의 조화 