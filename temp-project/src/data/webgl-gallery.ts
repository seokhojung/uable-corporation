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
    description: '모던하고 아늑한 주거 공간의 3D 투어',
    path: '/webgl-gallery/home/index.html',
    thumbnail: '/webgl-gallery/home/2022-10-06-17-05-32/thumbnail.jpg',
    size: '120MB',
    tags: ['주거공간', '홈', '인테리어'],
    status: 'active'
  },
  {
    id: 'office',
    title: '오피스 공간',
    description: '현대적이고 효율적인 오피스 공간 체험',
    path: '/webgl-gallery/office/index.html',
    thumbnail: '/webgl-gallery/office/2022-10-18-14-24-28/thumbnail.jpg',
    size: '95MB',
    tags: ['오피스', '업무공간', '비즈니스'],
    status: 'active'
  },
  {
    id: 'parking',
    title: '주차장',
    description: '지하 주차장의 현실적인 3D 공간',
    path: '/webgl-gallery/parking/index.html',
    thumbnail: '/webgl-gallery/parking/2022-10-13-10-10-09/thumbnail.jpg',
    size: '85MB',
    tags: ['주차장', '지하시설', '인프라'],
    status: 'active'
  }
]

export const getActiveWebGLBundles = () => 
  webglBundles.filter(bundle => bundle.status === 'active')

export const getWebGLBundleById = (id: string) => 
  webglBundles.find(bundle => bundle.id === id)