// src/app/page.tsx
import { HomePageClient } from './home-page-client'

// 메타데이터 생성 함수
export async function generateMetadata() {
  return {
    title: 'Uable Corporation - 3D/AR/WebXR 솔루션 전문 기업',
    description: 'Uable Corporation(유에이블)은 혁신적인 3D, AR, WebXR 기술을 활용한 디지털 솔루션을 제공합니다. 3D 제품 컨피규레이터, 증강현실 애플리케이션, 웹 기반 VR 갤러리 등 다양한 프로젝트를 소개합니다.',
    keywords: 'Uable, 유에이블, Uable Corporation, 3D 솔루션, AR 개발, WebXR, Three.js, 증강현실, 가상현실, 3D 컨피규레이터',
    openGraph: {
      title: 'Uable Corporation - 3D/AR/WebXR 솔루션 전문 기업',
      description: 'Uable Corporation(유에이블)은 혁신적인 3D, AR, WebXR 기술을 활용한 디지털 솔루션을 제공합니다.',
      type: 'website',
      url: 'https://uable.co.kr',
      siteName: 'Uable Corporation',
      images: [
        {
          url: 'https://uable.co.kr/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
        }
      ],
    },
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    }
  }
}

export default function HomePage() {
  return <HomePageClient />
}