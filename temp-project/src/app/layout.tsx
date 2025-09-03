import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
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
  metadataBase: new URL('https://uable.co.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://uable.co.kr',
    siteName: 'Uable Corporation',
    title: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
    description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
    images: [
      {
        url: 'https://uable.co.kr/og-image.jpg',
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
    google: 'ZCH8fsrJ7tFRjaU10ACWwONt1JWELsc3751Pmsv8V-c',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Uable Corporation',
              alternateName: '유에이블',
              url: 'https://uable.co.kr',
              logo: 'https://uable.co.kr/UABLE-logo-full.png',
              description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KR',
                addressLocality: 'Seoul',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['Korean', 'English'],
              },
              sameAs: [
                'https://github.com/uable',
                'https://linkedin.com/company/uable-corporation',
              ],
              // 추가 서비스 키워드 (검색엔진용)
              makesOffer: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '3D 제품 컨피규레이터 개발',
                    alternateName: 'Three.js 3D 개발'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service', 
                    name: 'AR 마케팅 솔루션',
                    alternateName: 'AR.js 증강현실 개발'
                  }
                }
              ]
            })
          }}
        />
        {/* FAQ Schema - 키워드 노출을 위한 Q&A */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Three.js 개발 비용은 얼마인가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Three.js를 활용한 3D 개발 비용은 프로젝트 복잡도와 기능에 따라 다릅니다. 기본적인 3D 뷰어는 500만원부터, 인터랙티브 3D 제품 컨피규레이터는 1000만원부터 시작됩니다. 정확한 견적은 프로젝트 요구사항을 검토한 후 제공해드립니다.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'AR 앱 개발 기간은 얼마나 걸리나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'AR.js를 활용한 웹 기반 증강현실 개발은 4-6주, 네이티브 AR 모바일 앱은 8-12주 정도 소요됩니다. WebXR API를 사용한 브라우저 AR 경험은 6-8주가 일반적입니다. 프로젝트 규모와 복잡도에 따라 기간이 달라질 수 있습니다.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'WebXR과 일반 웹사이트의 차이점은 무엇인가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'WebXR은 웹브라우저에서 VR/AR 경험을 제공하는 기술입니다. 일반 웹사이트와 달리 3차원 공간에서 몰입형 인터랙션이 가능하며, VR 헤드셋이나 스마트폰을 통해 가상현실과 증강현실을 체험할 수 있습니다. 별도 앱 설치 없이 브라우저에서 바로 접근 가능한 것이 큰 장점입니다.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '3D 제품 컨피규레이터는 어떤 업종에 적합한가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '3D 제품 컨피규레이터는 자동차, 가구, 패션, 전자제품, 인테리어 업계에 특히 효과적입니다. 고객이 제품을 360도로 확인하고 색상, 재질, 옵션을 실시간으로 변경하며 구매 결정을 도울 수 있습니다. 온라인 쇼핑몰의 전환율 향상과 반품률 감소에 크게 기여합니다.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'React Three Fiber와 Three.js의 차이점은?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Three.js는 웹 3D 그래픽을 위한 JavaScript 라이브러리이고, React Three Fiber는 Three.js를 React 환경에서 선언적으로 사용할 수 있게 해주는 렌더러입니다. React Three Fiber를 사용하면 JSX 문법으로 3D 씬을 구성할 수 있어 React 개발자에게 더 친숙하고 유지보수가 용이합니다.'
                  }
                }
              ]
            })
          }}
        />
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
