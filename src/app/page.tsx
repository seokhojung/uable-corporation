// src/app/page.tsx
import { HomePageClient } from './home-page-client'

// 메타데이터 생성 함수
export async function generateMetadata() {
  return {
    title: 'Uable - 3D/AR/WebXR 솔루션',
    description: '혁신적인 3D, AR, WebXR 기술을 활용한 디지털 솔루션을 제공합니다. 3D 제품 컨피규레이터, 증강현실 애플리케이션, 웹 기반 VR 갤러리 등 다양한 프로젝트를 소개합니다.',
    openGraph: {
      title: 'Uable - 3D/AR/WebXR 솔루션',
      description: '혁신적인 3D, AR, WebXR 기술을 활용한 디지털 솔루션을 제공합니다.',
      type: 'website',
    },
  }
}

export default function HomePage() {
  return <HomePageClient />
}