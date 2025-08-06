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
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      alt: '3D 제품 컨피규레이터 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=3D+Configurator+Main',
        alt: '3D 제품 컨피규레이터 메인 화면',
        width: 1200,
        height: 800
      },
      {
        src: 'https://via.placeholder.com/1200x800?text=3D+Configurator+Options',
        alt: '제품 옵션 선택 화면',
        width: 1200,
        height: 800
      },
      {
        src: 'https://via.placeholder.com/1200x800?text=3D+Configurator+Result',
        alt: '최종 결과물 화면',
        width: 1200,
        height: 800
      }
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  },
  {
    id: 'ar-furniture-app',
    title: 'AR 가구 배치 앱',
    description: '스마트폰 카메라를 통해 실제 환경에 가구를 배치하고 확인할 수 있는 증강현실 앱입니다. ARKit과 Unity를 활용하여 정확한 공간 인식과 렌더링을 구현했습니다.',
    shortDescription: '증강현실 가구 배치 애플리케이션',
    category: 'ar-vr',
    technologies: ['Unity', 'ARKit', 'C#', 'iOS', 'Android'],
    duration: {
      start: '2023-09',
      end: '2024-01'
    },
    teamSize: 6,
    role: 'AR 개발자',
    achievements: [
      '정확한 공간 인식 및 추적',
      '실시간 3D 모델 렌더링',
      '크로스 플랫폼 지원'
    ],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      alt: 'AR 가구 배치 앱 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=AR+Furniture+App',
        alt: 'AR 가구 배치 화면',
        width: 1200,
        height: 800
      }
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
    title: 'WebXR VR 갤러리',
    description: '브라우저에서 바로 VR 경험을 제공하는 웹 기반 가상현실 갤러리입니다. WebXR API를 활용하여 설치 없이 VR 헤드셋으로 접근할 수 있습니다.',
    shortDescription: '웹 기반 VR 갤러리',
    category: 'webxr',
    technologies: ['WebXR', 'Three.js', 'React', 'TypeScript', 'A-Frame'],
    duration: {
      start: '2024-02',
      end: '2024-04'
    },
    teamSize: 3,
    role: 'WebXR 개발자',
    achievements: [
      'WebXR API 최적화',
      'VR 컨트롤러 인터랙션 구현',
      '성능 최적화로 부드러운 VR 경험 제공'
    ],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      alt: 'WebXR VR 갤러리 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=WebXR+VR+Gallery',
        alt: 'VR 갤러리 메인 화면',
        width: 1200,
        height: 800
      }
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
    title: 'WebXR 쇼룸',
    description: '브라우저에서 바로 VR/AR 경험을 제공하는 웹 기반 쇼룸입니다. WebXR API를 활용하여 설치 없이 제품을 3D로 확인하고 상호작용할 수 있습니다.',
    shortDescription: '웹 기반 VR/AR 쇼룸',
    category: 'webxr',
    technologies: ['WebXR', 'Three.js', 'React', 'TypeScript', 'A-Frame'],
    duration: {
      start: '2023-11',
      end: '2024-02'
    },
    teamSize: 5,
    role: 'WebXR 개발자',
    achievements: [
      'WebXR API 최적화',
      '실시간 3D 제품 렌더링',
      '크로스 플랫폼 VR/AR 지원'
    ],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      alt: 'WebXR 쇼룸 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=WebXR+Showroom+Main',
        alt: 'WebXR 쇼룸 메인 화면',
        width: 1200,
        height: 800
      },
      {
        src: 'https://via.placeholder.com/1200x800?text=WebXR+Showroom+Product',
        alt: '제품 상세 화면',
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
    title: '3D 데이터 시각화',
    description: '복잡한 데이터를 3D 공간에서 직관적으로 시각화하는 웹 애플리케이션입니다. Three.js와 D3.js를 결합하여 인터랙티브한 데이터 탐색 경험을 제공합니다.',
    shortDescription: '3D 공간 데이터 시각화',
    category: '3d-visualization',
    technologies: ['Three.js', 'D3.js', 'React', 'TypeScript', 'WebGL'],
    duration: {
      start: '2024-03',
      end: '2024-05'
    },
    teamSize: 4,
    role: '데이터 시각화 개발자',
    achievements: [
      '대용량 데이터 처리 최적화',
      '인터랙티브 3D 시각화 구현',
      '실시간 데이터 업데이트'
    ],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      alt: '3D 데이터 시각화 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=3D+Data+Visualization',
        alt: '3D 데이터 시각화 메인 화면',
        width: 1200,
        height: 800
      }
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
    title: 'AR 교육 콘텐츠',
    description: '증강현실을 활용한 인터랙티브 교육 콘텐츠입니다. ARKit과 Unity를 활용하여 학습자가 실제 환경에서 3D 모델과 상호작용하며 학습할 수 있습니다.',
    shortDescription: '증강현실 교육 콘텐츠',
    category: 'ar-vr',
    technologies: ['Unity', 'ARKit', 'C#', 'iOS', 'Vuforia'],
    duration: {
      start: '2023-12',
      end: '2024-03'
    },
    teamSize: 5,
    role: 'AR 콘텐츠 개발자',
    achievements: [
      '인터랙티브 3D 교육 모델 구현',
      '학습 진도 추적 시스템',
      '다양한 교육 분야 지원'
    ],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      alt: 'AR 교육 콘텐츠 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: 'https://via.placeholder.com/1200x800?text=AR+Education+Content',
        alt: 'AR 교육 콘텐츠 화면',
        width: 1200,
        height: 800
      }
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