// WebGL Gallery 데이터 관리
export interface WebGLBundle {
  id: string
  title: string
  description: string
  path: string
  thumbnail?: string
  size?: string
  tags: string[]
  status: 'active' | 'development' | 'disabled'
}

export const webglBundles: WebGLBundle[] = [
  {
    id: 'webtoon',
    title: '웹툰 스튜디오',
    description: '창작 공간과 엔터테인먼트가 어우러진 인터랙티브 3D 스튜디오',
    path: '/webgl-gallery/webtoon/index.html',
    thumbnail: '/webgl-gallery/webtoon/2022-10-06-18-29-43/thumbnail.jpg',
    size: '24MB',
    tags: ['스튜디오', '창작공간', '인터랙티브'],
    status: 'active'
  },
  // 향후 추가할 번들들
  {
    id: 'chungwoo',
    title: '청우 프로젝트',
    description: '레트로 아케이드 게임이 있는 인터랙티브 3D 공간',
    path: '/webgl-gallery/chungwoo/index.html',
    thumbnail: '/webgl-gallery/chungwoo/2022-10-07-09-33-02/thumbnail.jpg',
    size: '180MB',
    tags: ['아케이드', '레트로', '게임', '3D공간'],
    status: 'active'
  },
  {
    id: 'home',
    title: '홈 갤러리',
    description: '홈 공간 3D 투어',
    path: '/webgl-gallery/home/index.html',
    tags: ['홈', '주거공간'],
    status: 'development'
  },
  {
    id: 'office',
    title: '오피스 공간',
    description: '현대적인 오피스 공간 체험',
    path: '/webgl-gallery/office/index.html',
    tags: ['오피스', '업무공간'],
    status: 'development'
  },
  {
    id: 'parking',
    title: '주차장',
    description: '지하 주차장 3D 공간',
    path: '/webgl-gallery/parking/index.html',
    tags: ['주차장', '인프라'],
    status: 'development'
  }
]

export const getActiveWebGLBundles = () => 
  webglBundles.filter(bundle => bundle.status === 'active')

export const getWebGLBundleById = (id: string) => 
  webglBundles.find(bundle => bundle.id === id)