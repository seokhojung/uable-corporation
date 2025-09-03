import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'Uable Corporation의 개인정보처리방침. 고객의 개인정보를 안전하게 보호하고 관리합니다.',
  openGraph: {
    title: '개인정보처리방침 | Uable Corporation',
    description: 'Uable Corporation의 개인정보처리방침. 고객의 개인정보를 안전하게 보호하고 관리합니다.',
    type: 'website',
  },
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}