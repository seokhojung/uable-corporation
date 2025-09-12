// src/data/products.ts

export interface Product {
  id: string
  title: string
  description: string
  backgroundImage: string
  backgroundStyle: {
    backgroundColor?: string
    backgroundSize?: string
    gradient?: string
  }
  badgeStyle: {
    background: string
    textColor: string
    border: string
  }
  features: string[]
  metrics: {
    label: string
    value: string
    description: string
  }[]
  buttons: {
    primary: {
      text: string
      href: string
      external?: boolean
    }
    secondary: {
      text: string
      href: string
    }
  }
}

export const products: Product[] = [
  {
    id: 'befun',
    title: 'BEFUN',
    description: '고객이 제품을 360도로 확인하고 다양한 옵션을 실시간으로 구성할 수 있는 인터랙티브 3D 솔루션입니다.',
    backgroundImage: '/portfolio/3d-product-configurator/thumbnails/befun-logo.png',
    backgroundStyle: {
      backgroundColor: 'bg-white',
      backgroundSize: '50%'
    },
    badgeStyle: {
      background: 'bg-emerald-600/90',
      textColor: 'text-white',
      border: 'border-emerald-500'
    },
    features: [
      '실시간 3D 렌더링',
      '다양한 커스터마이징 옵션',
      '모바일 완벽 호환'
    ],
    metrics: [
      {
        label: '35%',
        value: 'emerald-600',
        description: '전환율 증가'
      },
      {
        label: '240%',
        value: 'blue-600',
        description: '체류시간 증가'
      }
    ],
    buttons: {
      primary: {
        text: '라이브 데모',
        href: 'https://befunweb.vercel.app/configurator',
        external: true
      },
      secondary: {
        text: '자세히 보기',
        href: '/portfolio/3d-product-configurator'
      }
    }
  },
  {
    id: 'archiple-studio',
    title: 'Archiple Studio',
    description: '언리얼 엔진을 활용한 설치형 인터랙티브 공간 투어 시스템으로 고해상도 3D 환경에서 몰입형 경험을 제공합니다.',
    backgroundImage: '/portfolio/interactive-space-tour/thumbnails/archiple-logo.png',
    backgroundStyle: {
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      backgroundSize: 'cover'
    },
    badgeStyle: {
      background: 'bg-emerald-600/90',
      textColor: 'text-white',
      border: 'border-emerald-500'
    },
    features: [
      '고품질 3D 공간 렌더링',
      '직관적 네비게이션 시스템',
      '몰입형 인터랙티브 경험'
    ],
    metrics: [
      {
        label: '65%',
        value: 'emerald-600',
        description: '계약 전환율 증가'
      },
      {
        label: '40%',
        value: 'blue-600',
        description: '영업 사이클 단축'
      }
    ],
    buttons: {
      primary: {
        text: '영상 보기',
        href: '/videos/archipleNRP.mp4',
        external: true
      },
      secondary: {
        text: '자세히 보기',
        href: '/portfolio/interactive-space-tour'
      }
    }
  }
]