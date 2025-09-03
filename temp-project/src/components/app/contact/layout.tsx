import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의하기',
  description: '3D/AR/WebXR 프로젝트 상담 및 견적 문의. 최신 기술과 창의적인 솔루션으로 비즈니스의 디지털 혁신을 지원합니다.',
  openGraph: {
    title: '문의하기 | Uable Corporation',
    description: '3D/AR/WebXR 프로젝트 상담 및 견적 문의. 최신 기술과 창의적인 솔루션으로 비즈니스의 디지털 혁신을 지원합니다.',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}