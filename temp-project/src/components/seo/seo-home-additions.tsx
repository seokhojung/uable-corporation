'use client'

// 홈페이지에 추가할 SEO 텍스트 컴포넌트

export function SeoHomeAdditions() {
  return (
    <>
      {/* SR-Only 텍스트 - 검색엔진은 읽지만 화면에 안 보임 */}
      <div className="sr-only">
        <h2>서울 강남구 3D AR WebXR 개발 전문 기업</h2>
        <p>언주로 97길 7 위치한 Three.js, React Three Fiber, AR.js 전문 개발팀</p>
        <p>웹 기반 3D 뷰어, 증강현실 마케팅, WebXR 가상 쇼룸 제작</p>
        
        <h3>제공 서비스</h3>
        <ul>
          <li>Three.js 기반 3D 제품 컨피규레이터 개발</li>
          <li>AR.js 웹 증강현실 솔루션 구축</li>
          <li>WebXR API 브라우저 VR 체험 제작</li>
          <li>React Three Fiber 인터랙티브 3D 웹사이트</li>
          <li>WebGL 고성능 3D 그래픽 개발</li>
        </ul>
        
        <h3>기술 전문 분야</h3>
        <ul>
          <li>Three.js 라이브러리 전문 개발</li>
          <li>React Three Fiber 컴포넌트 설계</li>
          <li>AR.js 마커 기반 증강현실</li>
          <li>WebXR 몰입형 경험 구현</li>
          <li>GLTF 3D 모델 최적화</li>
        </ul>
        
        <h3>타겟 고객</h3>
        <ul>
          <li>이커머스 3D 제품 뷰어 필요 기업</li>
          <li>AR 마케팅 캠페인 진행 브랜드</li>
          <li>가상 쇼룸 구축 희망 업체</li>
          <li>인터랙티브 웹사이트 제작 의뢰</li>
        </ul>
      </div>

      {/* 구조화된 데이터 - Service 확장 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': 'https://uable.co.kr/#service',
            name: '3D AR WebXR 개발 서비스',
            alternateName: ['Three.js 개발', 'React Three Fiber 전문', 'AR.js 구현'],
            description: 'Three.js와 React Three Fiber를 활용한 웹 3D 개발, AR.js 증강현실, WebXR 가상현실 전문 서비스',
            provider: {
              '@type': 'Organization',
              '@id': 'https://uable.co.kr/#organization',
              name: 'Uable Corporation'
            },
            serviceType: [
              '3D Web Development',
              'Augmented Reality Development', 
              'WebXR Development',
              'Three.js Development',
              'React Three Fiber Development'
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: '3D AR 개발 서비스',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Three.js 3D 웹 개발',
                    description: 'Three.js 라이브러리를 활용한 고품질 웹 3D 그래픽 및 인터랙티브 경험 개발',
                    category: 'Web 3D Development'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'React Three Fiber 개발',
                    description: 'React 환경에서 선언적 3D 그래픽 개발을 위한 React Three Fiber 전문 서비스',
                    category: 'React 3D Development'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'AR.js 웹 증강현실',
                    description: '브라우저에서 동작하는 마커 기반 증강현실 솔루션 AR.js 개발',
                    category: 'Web AR Development'
                  }
                }
              ]
            },
            areaServed: {
              '@type': 'Place',
              name: '서울특별시',
              containsPlace: {
                '@type': 'Place', 
                name: '강남구'
              }
            },
            availableLanguage: ['ko', 'en'],
            priceRange: '$$$'
          })
        }}
      />
    </>
  )
}