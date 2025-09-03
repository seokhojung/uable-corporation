import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '포트폴리오',
  description: 'Uable Corporation의 3D/AR/WebXR 프로젝트 포트폴리오. 실제 구현된 다양한 디지털 혁신 사례를 확인하세요.',
  openGraph: {
    title: '포트폴리오 | Uable Corporation',
    description: 'Uable Corporation의 3D/AR/WebXR 프로젝트 포트폴리오. 실제 구현된 다양한 디지털 혁신 사례를 확인하세요.',
    type: 'website',
  },
  alternates: {
    canonical: '/portfolio',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}