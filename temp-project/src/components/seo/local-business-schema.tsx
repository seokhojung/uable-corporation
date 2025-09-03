// src/components/seo/local-business-schema.tsx

export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://uable.co.kr/#business',
    name: 'Uable Corporation',
    alternateName: '유에이블',
    image: 'https://uable.co.kr/UABLE-logo-full.png',
    logo: 'https://uable.co.kr/UABLE-logo-full.png',
    url: 'https://uable.co.kr',
    telephone: '+82-2-557-6637',
    email: 'admin@uable.co.kr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '언주로 97길 7, 5F',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      postalCode: '06134',
      addressCountry: 'KR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5045,
      longitude: 127.0437
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    priceRange: '$$',
    servesCuisine: 'Technology Services',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12'
    }
  }
}

export const getFAQSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '3D 제품 컨피규레이터란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '3D 제품 컨피규레이터는 고객이 웹브라우저에서 제품을 360도로 확인하고, 색상, 재질, 옵션 등을 실시간으로 변경하며 커스터마이징할 수 있는 인터랙티브 3D 솔루션입니다.'
        }
      },
      {
        '@type': 'Question',
        name: 'AR 솔루션 개발 기간은 얼마나 걸리나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '프로젝트 규모에 따라 다르지만, 일반적인 AR 앱은 2-3개월, 복잡한 기능이 포함된 경우 4-6개월 정도 소요됩니다. 정확한 기간은 상담 후 안내드립니다.'
        }
      },
      {
        '@type': 'Question',
        name: 'WebXR과 일반 웹사이트의 차이점은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WebXR은 웹브라우저에서 VR/AR 경험을 제공하는 기술입니다. 별도 앱 설치 없이 브라우저에서 바로 가상현실과 증강현실을 체험할 수 있어 접근성이 뛰어납니다.'
        }
      },
      {
        '@type': 'Question',
        name: '견적 문의는 어떻게 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '홈페이지의 문의하기 페이지를 통해 프로젝트 내용을 작성해주시면, 담당자가 24시간 내에 연락드려 상세한 상담을 진행합니다.'
        }
      }
    ]
  }
}

export const getBreadcrumbListSchema = (items: Array<{name: string, url?: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://uable.co.kr${item.url}` : undefined
    }))
  }
}