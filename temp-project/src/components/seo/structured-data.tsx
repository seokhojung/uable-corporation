// src/components/seo/structured-data.tsx

export const getStructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Uable Corporation',
    url: 'https://uable.co.kr',
    logo: 'https://uable.co.kr/UABLE-logo-full.png',
    description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'Seoul',
      addressRegion: 'Seoul',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-10-1234-5678',
      contactType: 'customer service',
      email: 'contact@uable.co.kr',
    },
    sameAs: [
      'https://twitter.com/uablecorp',
      'https://linkedin.com/company/uable-corporation',
      'https://github.com/uable',
    ],
    knowsAbout: [
      '3D Technology',
      'Augmented Reality',
      'Virtual Reality',
      'WebXR',
      'Three.js',
      'React Three Fiber',
      'AR.js',
      'Unity',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3D Product Configurator',
            description: '고객이 제품을 360도로 확인하고 다양한 옵션을 실시간으로 구성할 수 있는 인터랙티브 3D 솔루션',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AR Mobile App',
            description: '스마트폰 카메라를 통해 실제 환경에 제품을 배치하고 확인할 수 있는 증강현실 솔루션',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WebXR Web Experience',
            description: '브라우저에서 바로 VR/AR 경험을 제공하는 웹 기반 확장현실 솔루션',
          },
        },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Uable Corporation',
    url: 'https://uable.co.kr',
    description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://uable.co.kr/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return {
    organizationSchema,
    websiteSchema,
  }
}

const StructuredData = () => {
  const { organizationSchema, websiteSchema } = getStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}

export default StructuredData 