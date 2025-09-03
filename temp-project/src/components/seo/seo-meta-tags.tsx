// src/components/seo/seo-meta-tags.tsx
// 추가 SEO 메타태그 컴포넌트

interface SEOMetaTagsProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}

export function SEOMetaTags({
  title = 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
  description = '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
  image = 'https://uable.co.kr/og-image.jpg',
  url = 'https://uable.co.kr',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  keywords = []
}: SEOMetaTagsProps) {
  return (
    <>
      {/* 네이버 전용 메타태그 */}
      <meta property="naver:site:name" content="Uable Corporation" />
      <meta property="naver:site:type" content={type} />
      
      {/* 다음(카카오) 메타태그 */}
      <meta property="dg:plink" content={url} />
      
      {/* 추가 Open Graph 태그 */}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* 추가 트위터 태그 */}
      <meta name="twitter:image:alt" content={title} />
      
      {/* 추가 키워드 */}
      {keywords.length > 0 && (
        <meta property="article:tag" content={keywords.join(', ')} />
      )}
      
      {/* 모바일 앱 링크 (향후 앱 출시시) */}
      {/* <meta property="al:ios:app_name" content="Uable" />
      <meta property="al:android:app_name" content="Uable" /> */}
      
      {/* 언어 및 지역 */}
      <meta property="og:locale:alternate" content="en_US" />
      <meta name="language" content="Korean" />
      <meta name="geo.region" content="KR-11" />
      <meta name="geo.placename" content="Seoul" />
      <meta name="geo.position" content="37.5045;127.0437" />
      <meta name="ICBM" content="37.5045, 127.0437" />
    </>
  )
}