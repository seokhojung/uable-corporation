/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  // 동적 라우팅을 위한 설정
  trailingSlash: false,
  // 정적 생성을 위한 설정
  output: 'export',
  // 이미지 최적화 설정
  images: {
    unoptimized: true, // 정적 export를 위해 이미지 최적화 비활성화
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // 성능 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 정적 생성을 위한 설정
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig