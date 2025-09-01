// src/types/portfolio.ts

export interface PortfolioProject {
  id: string
  title: string
  description: string
  shortDescription: string
  category: '3d-visualization' | 'ar-vr' | 'webxr' | 'web-development' | 'interactive-installation' | '3d-platform'
  technologies: string[]
  duration: {
    start: string
    end: string
  }
  teamSize: number
  role: string
  achievements: string[]
  thumbnail: {
    src: string
    alt: string
    width: number
    height: number
  }
  images: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  videos?: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  links: {
    demo?: string
    contact?: string
  }
  detailContent?: {
    background: string
    challenges: string[]
    solutions: string[]
    impact: string
  }
  visualMetrics?: {
    coreValues: {
      label: string
      value: number
      unit: '%' | '배' | 'X' | '점'
      type: 'donut' | 'gauge' | 'progress'
      color: string
      description: string
    }[]
    differentiators: {
      label: string
      value: number
      unit: 'ms' | 's' | '%' | '도' | 'fps'
      type: 'speedometer' | 'circular' | 'bar'
      color: string
      description: string
    }[]
  }
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioFilters {
  category?: string
  technologies?: string[]
  search?: string
  sortBy: 'newest' | 'oldest' | 'featured'
}

export interface PortfolioCategory {
  value: string
  label: string
  description: string
  icon: string
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    value: '3d-visualization',
    label: '3D 시각화',
    description: 'Three.js, WebGL을 활용한 3D 시각화 프로젝트',
    icon: 'Cube'
  },
  {
    value: 'ar-vr',
    label: 'AR/VR',
    description: '증강현실 및 가상현실 프로젝트',
    icon: 'Glasses'
  },
  {
    value: 'webxr',
    label: 'WebXR',
    description: '웹 기반 확장현실 프로젝트',
    icon: 'Globe'
  },
  {
    value: 'web-development',
    label: '웹 개발',
    description: '반응형 웹사이트 및 웹 애플리케이션',
    icon: 'Code'
  },
  {
    value: 'interactive-installation',
    label: '인터렉티브 설치',
    description: '설치형 인터렉티브 공간 및 체험 프로젝트',
    icon: 'Building'
  },
  {
    value: '3d-platform',
    label: '3D 플랫폼',
    description: '3D 모델 뷰어 및 배포 플랫폼',
    icon: 'Box'
  }
]

export const TECHNOLOGIES = [
  'Three.js',
  'React',
  'Next.js',
  'TypeScript',
  'WebGL',
  'WebXR',
  'Unity',
  'AR.js',
  'ARCore',
  'ARKit',
  'Enscape',
  'C#',
  'Android',
  'Kotlin',
  'VR',
  '3D Rendering',
  'Interactive Design',
  'Framer Motion',
  'Tailwind CSS',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Git'
] 