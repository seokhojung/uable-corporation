import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getStructuredData } from '@/components/seo/structured-data'
import SkipLink from '@/components/ui/skip-link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
    template: '%s | Uable Corporation',
  },
  description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다. 고품질의 시각 자료와 정교한 애니메이션으로 회사의 선도적인 기술 역량을 효과적으로 선보입니다.',
  keywords: ['3D', 'AR', 'WebXR', 'Three.js', 'React Three Fiber', '증강현실', '가상현실', '웹개발'],
  authors: [{ name: 'Uable Corporation' }],
  creator: 'Uable Corporation',
  publisher: 'Uable Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uable.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://uable.com',
    siteName: 'Uable Corporation',
    title: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
    description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
    images: [
      {
        url: 'https://uable.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@uablecorp',
    creator: '@uablecorp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Uable Corporation" />
        <meta name="application-name" content="Uable Corporation" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
