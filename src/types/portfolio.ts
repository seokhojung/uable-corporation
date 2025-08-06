// src/types/portfolio.ts

export interface PortfolioProject {
  id: string
  title: string
  description: string
  shortDescription: string
  category: '3d-visualization' | 'ar-vr' | 'webxr' | 'web-development'
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
  'Framer Motion',
  'Tailwind CSS',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Git'
] 