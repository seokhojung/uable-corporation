// src/components/seo/default-seo.tsx
import Head from 'next/head'

const DefaultSEO = () => {
  return (
    <Head>
      <title>Uable Corporation - 3D/AR/WebXR 기술 전문 기업</title>
      <meta name="description" content="3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다. 고품질의 시각 자료와 정교한 애니메이션으로 회사의 선도적인 기술 역량을 효과적으로 선보입니다." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}

export default DefaultSEO 