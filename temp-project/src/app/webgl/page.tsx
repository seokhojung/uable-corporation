import { Metadata } from 'next'
import { WebGLPageClient } from './webgl-page-client'

export const metadata: Metadata = {
  title: 'WebGL 3D 체험 갤러리 - Uable Corporation',
  description: 'Uable Corporation의 WebGL 기술로 구현한 실감나는 3D 환경들을 직접 체험해보세요. 웹툰 스튜디오, 쇼룸, 홈 갤러리 등 다양한 인터랙티브 3D 공간이 준비되어 있습니다.',
  keywords: 'WebGL, 3D 체험, 가상현실, 인터랙티브, 3D 갤러리, Uable, 유에이블, 3D 공간, WebGL 기술',
  openGraph: {
    title: 'WebGL 3D 체험 갤러리 - Uable Corporation',
    description: 'Uable Corporation의 WebGL 기술로 구현한 실감나는 3D 환경들을 직접 체험해보세요.',
    type: 'website',
    url: 'https://uable.co.kr/webgl',
  },
}

export default function WebGLPage() {
  return <WebGLPageClient />
}