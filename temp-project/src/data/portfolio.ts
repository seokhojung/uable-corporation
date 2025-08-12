// src/data/portfolio.ts
import { PortfolioProject } from '@/types/portfolio'

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '3d-product-configurator',
    title: '3D 제품 컨피규레이터',
    description: '고객이 제품을 360도로 확인하고 다양한 옵션을 실시간으로 구성할 수 있는 인터랙티브 3D 솔루션입니다. Three.js와 WebGL을 활용하여 고품질의 3D 렌더링을 제공합니다.',
    shortDescription: '인터랙티브 3D 제품 구성 도구',
    category: '3d-visualization',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'Framer Motion'],
    duration: {
      start: '2024-01',
      end: '2024-03'
    },
    teamSize: 4,
    role: '프론트엔드 개발자',
    achievements: [
      '실시간 3D 렌더링 성능 최적화',
      '사용자 인터랙션 UX 개선',
      '모바일 디바이스 호환성 확보'
    ],
    thumbnail: {
      src: '/portfolio/3d-product-configurator/thumbnails/main.webp',
      alt: '3D 제품 컨피규레이터 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: '/portfolio/3d-product-configurator/gallery/interface.webp',
        alt: '3D 제품 컨피규레이터 인터페이스 - 픽셀 수납장 구성 도구',
        width: 1200,
        height: 800
      }
    ],
    links: {
      demo: 'https://befun241204.netlify.app/', // 외부 데모 링크
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  },
  {
    id: 'ar-furniture-app',
    title: 'AR 사물 배치 앱',
    description: '안드로이드 기반으로 스마트폰 카메라를 통해 실제 환경에 다양한 사물을 배치하고 확인할 수 있는 증강현실 앱입니다. ARCore와 Unity를 활용하여 정확한 공간 인식과 렌더링을 구현했습니다.',
    shortDescription: '안드로이드 증강현실 사물 배치 애플리케이션',
    category: 'ar-vr',
    technologies: ['Unity', 'ARCore', 'C#', 'Android', 'Kotlin'],
    duration: {
      start: '2023-09',
      end: '2024-01'
    },
    teamSize: 6,
    role: 'AR 개발자',
    achievements: [
      '정확한 공간 인식 및 추적',
      '실시간 3D 모델 렌더링',
      '안드로이드 플랫폼 최적화'
    ],
    thumbnail: {
      src: '/portfolio/ar-furniture-app/thumbnails/main.webp',
      alt: 'AR 사물 배치 앱 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],

    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: true,
    createdAt: '2023-09-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'webxr-vr-gallery',
    title: '웹 XR',
    description: 'WebGL과 Three.js를 활용한 웹 기반 확장현실(XR) 플랫폼입니다. 브라우저에서 바로 VR/AR 경험을 제공하며, 설치 없이 다양한 디바이스에서 접근할 수 있습니다.',
    shortDescription: '웹 기반 XR 플랫폼',
    category: 'webxr',
    technologies: ['WebGL', 'Three.js', 'React', 'TypeScript', 'WebXR'],
    duration: {
      start: '2024-02',
      end: '2024-04'
    },
    teamSize: 3,
    role: 'WebXR 개발자',
    achievements: [
      'WebGL 기반 고성능 렌더링',
      'Three.js를 활용한 3D 인터랙션',
      '크로스 플랫폼 XR 호환성 확보'
    ],
    thumbnail: {
      src: '/portfolio/webxr-vr-gallery/thumbnails/main.webp',
      alt: '웹 XR 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-04-15'
  },
  {
    id: 'webxr-showroom',
    title: '인터렉티브 공간 투어',
    description: '엔스케이프와 Unity를 활용한 설치형 인터렉티브 공간 투어 시스템입니다. 고해상도 3D 환경에서 사용자가 직접 공간을 탐색하고 상호작용할 수 있는 몰입형 경험을 제공합니다.',
    shortDescription: '인터렉티브 공간 투어 시스템',
    category: 'interactive-installation',
    technologies: ['Enscape', 'Unity', 'C#', '3D Rendering', 'Interactive Design'],
    duration: {
      start: '2023-11',
      end: '2024-02'
    },
    teamSize: 5,
    role: '인터렉티브 공간 개발자',
    achievements: [
      '고품질 3D 공간 렌더링',
      '직관적인 네비게이션 시스템',
      '몰입형 인터렉티브 경험 구현'
    ],
    thumbnail: {
      src: '/portfolio/webxr-showroom/thumbnails/main.webp',
      alt: '인터렉티브 공간 투어 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: '/portfolio/webxr-showroom/gallery/HighresScreenshot00000.png',
        alt: '인터렉티브 공간 투어 스크린샷 1',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/webxr-showroom/gallery/HighresScreenshot00001.png',
        alt: '인터렉티브 공간 투어 스크린샷 2',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/webxr-showroom/gallery/HighresScreenshot00002.png',
        alt: '인터렉티브 공간 투어 스크린샷 3',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/webxr-showroom/gallery/HighresScreenshot00004.png',
        alt: '인터렉티브 공간 투어 스크린샷 4',
        width: 1200,
        height: 800
      }
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: true,
    createdAt: '2023-11-05',
    updatedAt: '2024-02-20'
  },
  {
    id: '3d-data-visualization',
    title: '3D 모델 뷰어 플랫폼',
    description: 'Three.js를 기반으로 한 3D 모델 뷰어 플랫폼입니다. 다양한 3D 모델 포맷을 지원하며, 웹에서 직접 3D 모델을 업로드, 관리, 공유할 수 있는 통합 솔루션을 제공합니다.',
    shortDescription: '3D 모델 뷰어 플랫폼',
    category: '3d-platform',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'Node.js'],
    duration: {
      start: '2024-03',
      end: '2024-05'
    },
    teamSize: 4,
    role: '3D 플랫폼 개발자',
    achievements: [
      '다양한 3D 모델 포맷 지원',
      '웹 기반 3D 뷰어 최적화',
      '모델 배포 및 관리 시스템 구축'
    ],
    thumbnail: {
      src: '/portfolio/3d-data-visualization/thumbnails/main.webp',
      alt: '3D 모델 뷰어 배포 플랫폼 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: false,
    createdAt: '2024-03-10',
    updatedAt: '2024-05-25'
  },
  {
    id: 'ar-education-content',
    title: '웹 VR 교육 콘텐츠',
    description: 'Unity를 활용한 웹 기반 VR 교육 콘텐츠입니다. 브라우저에서 직접 VR 헤드셋으로 접근 가능하며, 학습자가 가상 환경에서 3D 모델과 상호작용하며 학습할 수 있습니다.',
    shortDescription: '웹 기반 VR 교육 콘텐츠',
    category: 'ar-vr',
    technologies: ['Unity', 'WebXR', 'C#', 'WebGL', 'VR'],
    duration: {
      start: '2023-12',
      end: '2024-03'
    },
    teamSize: 5,
    role: 'VR 콘텐츠 개발자',
    achievements: [
      '인터랙티브 VR 교육 환경 구현',
      '웹 기반 VR 최적화',
      '다양한 교육 분야 VR 콘텐츠 제작'
    ],
    thumbnail: {
      src: '/portfolio/ar-education-content/thumbnails/main.webp',
      alt: '웹 VR 교육 콘텐츠 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: false,
    createdAt: '2023-12-01',
    updatedAt: '2024-03-15'
  }
] 