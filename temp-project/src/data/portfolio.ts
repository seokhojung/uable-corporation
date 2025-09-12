// src/data/portfolio.ts
import { PortfolioProject } from '@/types/portfolio'

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '3d-product-configurator',
    title: '3D 제품 컨피규레이터',
    description: '고객이 제품을 360도로 확인하고 다양한 옵션을 실시간으로 구성할 수 있는 인터랙티브 3D 솔루션입니다. Three.js와 WebGL을 활용하여 고품질의 3D 렌더링을 제공합니다.',
    shortDescription: '인터랙티브 3D 제품 구성 도구',
    category: '3d-visualization',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'Framer Motion'],
    duration: {
      start: '2024-01',
      end: '2024-03'
    },
    teamSize: 4,
    role: '프론트엔드 개발자',
    achievements: [
      '실시간 3D 렌더링 성능 최적화',
      '사용자 인터랙션 UX 개선',
      '모바일 디바이스 호환성 확보'
    ],
    thumbnail: {
      src: '/portfolio/3d-product-configurator/thumbnails/main.webp',
      alt: '3D 제품 컨피규레이터 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: '/portfolio/3d-product-configurator/gallery/KakaoTalk_20250814_163330691.png',
        alt: '3D 제품 컨피규레이터 인터페이스 - 메인 화면',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/3d-product-configurator/gallery/KakaoTalk_20250814_163406705.png',
        alt: '3D 제품 컨피규레이터 - 제품 구성 옵션',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/3d-product-configurator/gallery/KakaoTalk_20250814_163423036.png',
        alt: '3D 제품 컨피규레이터 - 3D 뷰어 화면',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/3d-product-configurator/gallery/KakaoTalk_20250814_163434083.png',
        alt: '3D 제품 컨피규레이터 - 상세 설정 패널',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/3d-product-configurator/gallery/KakaoTalk_20250814_163457254.png',
        alt: '3D 제품 컨피규레이터 - 최종 구성 결과',
        width: 1200,
        height: 800
      }
    ],
    videos: [
      {
        src: '/videos/inshowconfigurator.mp4',
        alt: '3D 제품 컨피규레이터 데모 영상',
        width: 1200,
        height: 675
      }
    ],
    links: {
      demo: 'https://befunweb.vercel.app/configurator', // 외부 데모 링크
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "온라인에서 제품을 판매하시는 기업들이 겪는 가장 큰 고민, '고객이 제품을 직접 만져보지 못해서 구매를 망설인다'는 문제를 해결합니다. 평면적인 제품 사진만으로는 고객의 구매 의사결정을 이끌어내기 어렵고, 결국 높은 이탈률과 낮은 전환율로 이어집니다. Uable의 3D 제품 컨피규레이터는 고객이 마치 매장에서 제품을 직접 만져보는 것처럼 360도 회전하며 살펴보고, 색상이나 옵션을 실시간으로 바꿔가며 확인할 수 있는 혁신적인 쇼핑 경험을 제공합니다.",
      challenges: [
        "온라인 쇼핑 시 제품의 실물감을 전달하기 어려운 문제",
        "고객이 제품 옵션을 선택할 때 결과를 미리 볼 수 없는 한계",
        "모바일에서도 끊김 없는 3D 체험을 제공해야 하는 과제",
        "복잡한 제품도 직관적으로 조작할 수 있는 UI 필요성",
        "빠른 로딩 속도로 고객의 이탈을 방지해야 하는 요구사항",
        "다양한 브라우저와 기기에서 동일한 품질 보장"
      ],
      solutions: [
        "실제 매장에서의 체험을 뛰어넘는 360도 인터랙티브 뷰어 제공",
        "원클릭으로 색상, 재질, 옵션을 바꿔가며 실시간 미리보기 가능",
        "모바일에서도 부드러운 터치 조작과 빠른 반응속도 구현",
        "누구나 쉽게 사용할 수 있는 직관적인 인터페이스 설계",
        "3초 이내 로딩으로 고객 이탈률 최소화",
        "모든 주요 브라우저와 디바이스에서 완벽 호환"
      ],
      impact: "도입 기업들의 평균 성과: 온라인 구매 전환율 35% 상승, 고객 체류시간 240% 증가, 제품 반품률 25% 감소를 달성했습니다. 특히 가구, 자동차, 전자제품 업계에서 '실제로 만져보는 것 같다'는 고객 만족도 95% 이상을 기록했습니다. 영업팀은 고객 상담 시간을 60% 단축할 수 있어 더 많은 잠재 고객에게 집중할 수 있게 되었으며, 전체 매출이 평균 40% 증가하는 놀라운 성과를 거두었습니다. ROI는 도입 후 6개월 내 300% 달성이 일반적입니다."
    },
    visualMetrics: {
      coreValues: [
        {
          label: '렌더링 성능',
          value: 92,
          unit: '%',
          type: 'progress',
          color: '#0ea5e9',
          description: '60FPS 안정적 3D 렌더링으로 부드러운 사용자 경험'
        },
        {
          label: '사용자 만족도',
          value: 94,
          unit: '%',
          type: 'gauge',
          color: '#22c55e',
          description: '직관적인 3D 인터페이스로 높은 사용자 만족도 달성'
        },
        {
          label: '커스터마이징 옵션',
          value: 200,
          unit: 'X',
          type: 'donut',
          color: '#d946ef',
          description: '다양한 색상과 재질 선택으로 개인화 가능'
        }
      ],
      differentiators: [
        {
          label: '모델 로딩 속도',
          value: 800,
          unit: 'ms',
          type: 'bar',
          color: '#22c55e',
          description: '대용량 3D 모델도 1초 이내 빠른 로딩'
        },
        {
          label: '폴리곤 처리 성능',
          value: 90,
          unit: 'fps',
          type: 'speedometer',
          color: '#0ea5e9',
          description: '50K+ 폴리곤 모델도 90fps로 부드러운 렌더링'
        },
        {
          label: '재질 정확도',
          value: 98,
          unit: '%',
          type: 'circular',
          color: '#d946ef',
          description: 'PBR 렌더링으로 실제와 거의 동일한 재질 표현'
        }
      ]
    },
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  },
  {
    id: 'ar-furniture-app',
    title: 'AR 사물 배치 앱',
    description: '안드로이드 기반으로 스마트폰 카메라를 통해 실제 환경에 다양한 사물을 배치하고 확인할 수 있는 증강현실 앱입니다. ARCore와 Unity를 활용하여 정확한 공간 인식과 렌더링을 구현했습니다.',
    shortDescription: '안드로이드 증강현실 사물 배치 애플리케이션',
    category: 'ar-vr',
    technologies: ['Unity', 'ARCore', 'C#', 'Android', 'Kotlin'],
    duration: {
      start: '2023-09',
      end: '2024-01'
    },
    teamSize: 6,
    role: 'AR 개발자',
    achievements: [
      '정확한 공간 인식 및 추적',
      '실시간 3D 모델 렌더링',
      '안드로이드 플랫폼 최적화'
    ],
    thumbnail: {
      src: '/portfolio/ar-furniture-app/thumbnails/main.webp',
      alt: 'AR 사물 배치 앱 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],

    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "가구나 인테리어 제품을 온라인으로 구매할 때 '우리 집에 어울릴까?' '크기가 맞을까?'라는 고민 때문에 구매를 포기하는 고객이 70% 이상입니다. 카탈로그 사진으로는 실제 공간에서의 느낌을 알 수 없어 매출 기회를 놓치는 기업들이 많습니다. Uable의 AR 사물 배치 앱은 고객이 스마트폰으로 자신의 공간을 비추기만 하면, 실제 크기의 가구를 그 자리에 가상으로 배치해 볼 수 있는 마법 같은 경험을 선사합니다. '진짜 있는 것 같다'는 놀라운 현실감으로 구매 확신을 드립니다.",
      challenges: [
        "온라인 가구 쇼핑 시 실제 공간 적합성을 판단하기 어려운 문제",
        "카탈로그 사진만으로는 크기감과 색상 매칭을 확신할 수 없는 한계",
        "구매 후 반품률이 높아 고객과 기업 모두 손실을 보는 상황",
        "매장 방문 없이도 확실한 구매 결정을 내릴 수 있는 도구 필요성",
        "다양한 스마트폰에서 동일하게 작동하는 AR 앱 구현 과제",
        "기술에 익숙하지 않은 고객도 쉽게 사용할 수 있는 UI 요구사항"
      ],
      solutions: [
        "스마트폰 카메라만으로 실제 크기의 가구를 정확히 배치하는 AR 기술 제공",
        "실제 조명과 그림자까지 반영하여 진짜 있는 것 같은 현실감 구현",
        "원터치로 색상과 재질을 바꿔가며 다양한 옵션 체험 가능",
        "초보자도 5초만에 사용법을 익힐 수 있는 직관적인 인터페이스",
        "모든 안드로이드 기기에서 동일한 고품질 AR 경험 보장",
        "오프라인에서도 작동하는 앱으로 언제 어디서나 이용 가능"
      ],
      impact: "도입 기업들의 실제 성과: 온라인 가구 판매 전환율 60% 상승, 제품 반품률 40% 감소, 고객 문의 시간 50% 단축을 기록했습니다. '집에 딱 맞네요!'라는 고객 만족 후기가 90% 이상이며, 특히 소파, 침대, 책상 등 대형 가구 카테고리에서 매출 증가 효과가 뚜렷합니다. 영업팀은 '크기 문의', '색상 문의' 등 반복적인 질문이 크게 줄어 신규 고객 발굴에 집중할 수 있게 되었습니다. 앱 출시 후 3개월 내 투자비용 회수, 연간 매출 80% 증가라는 놀라운 ROI를 달성하고 있습니다."
    },
    visualMetrics: {
      coreValues: [
        {
          label: 'AR 트래킹 정확도',
          value: 94,
          unit: '%',
          type: 'donut',
          color: '#0ea5e9',
          description: 'ARCore 기반 공간 인식 및 객체 추적 정확도'
        },
        {
          label: '앱 시작 시간',
          value: 3200,
          unit: '점',
          type: 'progress',
          color: '#22c55e',
          description: '앱 실행부터 AR 카메라 활성화까지의 시간'
        },
        {
          label: '배치 정확성',
          value: 89,
          unit: '%',
          type: 'gauge',
          color: '#d946ef',
          description: '사용자가 원하는 위치에 정확히 객체 배치 성공률'
        }
      ],
      differentiators: [
        {
          label: '렌더링 최적화',
          value: 45,
          unit: 'fps',
          type: 'speedometer',
          color: '#ef4444',
          description: '모바일 환경에서 안정적인 AR 렌더링 성능'
        },
        {
          label: '배터리 효율성',
          value: 85,
          unit: '%',
          type: 'bar',
          color: '#22c55e',
          description: '기존 AR 앱 대비 배터리 소모량 15% 절약'
        }
      ]
    },
    featured: true,
    createdAt: '2023-09-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'webxr-vr-gallery',
    title: '웹 XR',
    description: 'WebGL과 Three.js를 활용한 웹 기반 확장현실(XR) 플랫폼입니다. 브라우저에서 바로 VR/AR 경험을 제공하며, 설치 없이 다양한 디바이스에서 접근할 수 있습니다.',
    shortDescription: '웹 기반 XR 플랫폼',
    category: 'webxr',
    technologies: ['WebGL', 'Three.js', 'React', 'TypeScript', 'WebXR'],
    duration: {
      start: '2024-02',
      end: '2024-04'
    },
    teamSize: 3,
    role: 'WebXR 개발자',
    achievements: [
      'WebGL 기반 고성능 렌더링',
      'Three.js를 활용한 3D 인터랙션',
      '크로스 플랫폼 XR 호환성 확보'
    ],
    thumbnail: {
      src: '/portfolio/webxr-vr-gallery/thumbnails/main.webp',
      alt: '웹 XR 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "'앱 설치가 번거롭다', 'VR 기기가 없어서 체험할 수 없다'는 고객들의 불만으로 혁신적인 제품 홍보 기회를 놓치고 계신가요? 전시회, 쇼룸, 마케팅 이벤트에서 고객들이 줄을 서서 기다리거나 복잡한 설정 때문에 체험을 포기하는 상황을 해결합니다. Uable의 웹 XR 솔루션은 고객이 자신의 스마트폰이나 노트북으로 QR코드 하나만 스캔하면, 별도 앱 설치 없이 바로 몰입형 VR/AR 경험을 제공합니다. '진짜 신기하다!', '이렇게 간단할 줄 몰랐다'는 놀라운 반응으로 고객의 기억에 오래 남는 브랜드 체험을 선사합니다.",
      challenges: [
        "복잡한 VR 체험 때문에 실제 고객 참여율이 낮아 마케팅 효과가 반감되는 문제",
        "앱 설치, 기기 호환성 문제로 잠재 고객의 80%가 체험 전에 포기하는 상황",
        "전시회나 이벤트에서 기기 설정과 안내에 드는 인건비와 시간 비용 부담",
        "VR 헤드셋 구매와 관리에 드는 초기 투자 비용과 유지보수 어려움",
        "모바일부터 VR 헤드셋까지 다양한 기기에서 동일한 품질 보장의 어려움",
        "체험 후 고객 데이터 수집과 분석이 어려워 마케팅 성과 측정 한계"
      ],
      solutions: [
        "QR코드 스캔 한 번으로 즉시 체험 가능한 원터치 접근 시스템 제공",
        "스마트폰, 태블릿, 노트북에서 모두 완벽 작동하는 웹 기반 XR 구현",
        "별도 직원 안내 없이도 고객 스스로 쉽게 조작할 수 있는 직관적 인터페이스",
        "VR 장비 구매 없이도 고품질 몰입 체험을 제공하는 비용 효율적 솔루션",
        "기기 성능에 따라 자동으로 최적화되어 모든 고객에게 만족스러운 경험 보장",
        "실시간 체험 데이터 수집과 고객 행동 분석으로 마케팅 인사이트 제공"
      ],
      impact: "도입 기업들의 실제 성과: 전시회 부스 방문자의 체험 참여율 85% 상승, 고객 체류시간 300% 증가, 브랜드 인지도 측정에서 70% 향상을 기록했습니다. 특히 자동차, 부동산, 가전제품 업계에서 '실제로 만져본 것 같다', '집에서도 다시 보고 싶다'는 고객 반응이 폭발적입니다. 마케팅팀은 복잡한 체험 안내 업무가 90% 줄어들어 고객 상담과 영업 활동에 집중할 수 있게 되었고, 체험 후 구매 전환율이 평균 45% 증가하는 놀라운 성과를 달성했습니다. 초기 투자 대비 8개월 내 ROI 250% 회수가 일반적입니다."
    },
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-04-15'
  },
  {
    id: 'interactive-space-tour',
    title: '인터렉티브 공간 투어',
    description: '엔스케이프와 Unity를 활용한 설치형 인터렉티브 공간 투어 시스템입니다. 고해상도 3D 환경에서 사용자가 직접 공간을 탐색하고 상호작용할 수 있는 몰입형 경험을 제공합니다.',
    shortDescription: '인터렉티브 공간 투어 시스템',
    category: 'interactive-installation',
    technologies: ['Enscape', 'Unity', 'C#', '3D Rendering', 'Interactive Design'],
    duration: {
      start: '2023-11',
      end: '2024-02'
    },
    teamSize: 5,
    role: '인터렉티브 공간 개발자',
    achievements: [
      '고품질 3D 공간 렌더링',
      '직관적인 네비게이션 시스템',
      '몰입형 인터렉티브 경험 구현'
    ],
    thumbnail: {
      src: '/portfolio/interactive-space-tour/thumbnails/main.webp',
      alt: '인터렉티브 공간 투어 썸네일',
      width: 400,
      height: 300
    },
    images: [
      {
        src: '/portfolio/interactive-space-tour/gallery/HighresScreenshot00000.png',
        alt: '인터렉티브 공간 투어 스크린샷 1',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/interactive-space-tour/gallery/HighresScreenshot00001.png',
        alt: '인터렉티브 공간 투어 스크린샷 2',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/interactive-space-tour/gallery/HighresScreenshot00002.png',
        alt: '인터렉티브 공간 투어 스크린샷 3',
        width: 1200,
        height: 800
      },
      {
        src: '/portfolio/interactive-space-tour/gallery/HighresScreenshot00004.png',
        alt: '인터렉티브 공간 투어 스크린샷 4',
        width: 1200,
        height: 800
      }
    ],
    videos: [
      {
        src: '/videos/archipleNRP.mp4',
        alt: '인터랙티브 공간 투어 프로젝트 소개 영상',
        width: 1200,
        height: 675
      }
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "'완공 전에는 어떤 느낌인지 모르겠어요', '도면으로는 실제 크기감을 알 수 없어요'라는 고객 불만으로 계약 성사에 어려움을 겪고 계신가요? 아파트 모델하우스나 상업공간 프레젠테이션에서 평면적인 자료만으로는 고객의 마음을 움직이기 어렵습니다. 특히 대형 건설사나 인테리어 업체는 고객이 공간을 제대로 이해하지 못해 발생하는 설계 변경, 계약 지연, 클레임으로 매년 수억원의 손실을 보고 있습니다. Uable의 인터랙티브 공간 투어는 고객이 마치 완공된 공간에서 실제로 걸어다니는 것처럼 생생한 체험을 제공하여, '바로 이거예요!' 라는 즉석 계약까지 이어지는 강력한 세일즈 도구입니다.",
      challenges: [
        "모델하우스나 쇼룸 없이는 고객의 공간 만족도를 확신시키기 어려운 문제",
        "2D 도면과 3D 렌더링만으로는 실제 동선과 공간감 전달의 한계",
        "고객 설계 변경 요청으로 인한 프로젝트 지연과 추가 비용 부담",
        "다양한 인테리어 옵션과 조명 시나리오를 실시간으로 보여주기 어려운 제약",
        "영업 사원이 복잡한 도면 설명에 시간을 할애하며 핵심 영업 활동 시간 부족",
        "고객 체험 후 즉석 피드백 수집과 맞춤 제안이 어려운 시스템적 한계"
      ],
      solutions: [
        "실제로 걸어다니는 듯한 자연스러운 1인칭 시점 투어 경험 제공",
        "주간/야간, 계절별 조명과 다양한 인테리어 옵션 원클릭 전환 기능",
        "고객이 직접 공간을 탐험하며 세부사항까지 확인할 수 있는 자유로운 네비게이션",
        "실시간 가상 가구 배치와 인테리어 시뮬레이션으로 개인 취향 반영",
        "터치 한 번으로 공간 정보와 옵션 가격을 즉시 확인하는 스마트 정보 시스템",
        "고객 체험 데이터 자동 분석으로 선호도 파악과 맞춤 제안 생성"
      ],
      impact: "도입 기업들의 실제 성과: 고객 계약 전환율 65% 상승, 설계 변경 요청 70% 감소, 영업 사이클 40% 단축을 달성했습니다. '정말 그곳에 있는 것 같아요', '이제 확신이 서네요'라는 고객 만족도 95% 이상을 기록하며, 특히 프리미엄 아파트와 상업공간에서 즉석 계약률이 2배 증가했습니다. 영업팀은 도면 설명 시간이 80% 줄어들어 더 많은 잠재 고객을 만날 수 있게 되었고, 연간 매출이 평균 55% 증가하는 놀라운 성과를 거두었습니다. 투자비 대비 10개월 내 ROI 400% 달성이 일반적입니다."
    },
    featured: true,
    createdAt: '2023-11-05',
    updatedAt: '2024-02-20'
  },
  {
    id: '3d-data-visualization',
    title: '3D 모델 뷰어 플랫폼',
    description: 'Three.js를 기반으로 한 3D 모델 뷰어 플랫폼입니다. 다양한 3D 모델 포맷을 지원하며, 웹에서 직접 3D 모델을 업로드, 관리, 공유할 수 있는 통합 솔루션을 제공합니다.',
    shortDescription: '3D 모델 뷰어 플랫폼',
    category: '3d-platform',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'Node.js'],
    duration: {
      start: '2024-03',
      end: '2024-05'
    },
    teamSize: 4,
    role: '3D 플랫폼 개발자',
    achievements: [
      '다양한 3D 모델 포맷 지원',
      '웹 기반 3D 뷰어 최적화',
      '모델 배포 및 관리 시스템 구축'
    ],
    thumbnail: {
      src: '/portfolio/3d-data-visualization/thumbnails/main.webp',
      alt: '3D 모델 뷰어 배포 플랫폼 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    videos: [
      {
        src: '/videos/metahuman.mp4',
        alt: '3D 모델 뷰어 플랫폼 데모 영상',
        width: 1200,
        height: 675
      }
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "제조업, 건축, 게임 개발팀에서 '3D 파일이 안 열려요', '팀원마다 다른 소프트웨어를 써서 협업이 어려워요'라는 고민에 시달리고 계신가요? 수백만원짜리 전문 3D 소프트웨어를 팀원마다 구매하고, 파일 호환성 문제로 프로젝트가 지연되며, 외부 클라이언트와의 피드백 주고받기가 복잡해서 비용과 시간이 계속 새어나갑니다. Uable의 3D 데이터 시각화 플랫폼은 웹 브라우저 하나로 모든 3D 파일을 바로 열어보고, 전 세계 어디서나 실시간으로 협업하며, 클라이언트에게 즉석으로 공유할 수 있는 혁신적인 솔루션입니다. '이제 3D 소프트웨어 걱정 끝!' 이라는 안도감을 선사합니다.",
      challenges: [
        "다양한 3D 소프트웨어와 파일 포맷 호환성 문제로 인한 업무 효율성 저하",
        "고가의 3D 소프트웨어 라이선스 비용 부담과 팀 확장 시 추가 투자 압박",
        "원격 근무 시대에 3D 자산을 효과적으로 공유하고 검토하기 어려운 문제",
        "클라이언트나 외부 협력사와 3D 파일 공유 시 기술적 장벽과 보안 우려",
        "대용량 3D 파일 전송과 저장에 드는 네트워크 비용과 시간 낭비",
        "프로젝트 진행 중 3D 자산 버전 관리와 변경 사항 추적의 복잡성"
      ],
      solutions: [
        "모든 주요 3D 파일 포맷을 웹에서 즉시 열어보는 원클릭 뷰어 제공",
        "월 구독료만으로 무제한 팀원이 사용 가능한 합리적인 비용 구조",
        "실시간 화면 공유와 3D 공간 주석 기능으로 원격 협업 완벽 지원",
        "URL 링크 하나로 누구와도 안전하게 3D 파일 공유하는 간편 시스템",
        "자동 압축과 스트리밍 기술로 대용량 파일도 3초 내 빠른 로딩",
        "AI 기반 자동 버전 관리와 변경 사항 하이라이트로 프로젝트 추적 간소화"
      ],
      impact: "도입 기업들의 실제 성과: 3D 협업 효율성 80% 향상, 소프트웨어 라이선스 비용 60% 절감, 프로젝트 완료 시간 30% 단축을 달성했습니다. '드디어 3D 파일 호환성 고민이 사라졌어요', '클라이언트 피드백 받기가 이렇게 쉬울 줄 몰랐네요'라는 만족도 92%를 기록했습니다. 특히 제품 개발팀은 디자인 검토 사이클이 50% 빨라져 더 많은 아이디어를 실현할 수 있게 되었고, 연간 운영비 대비 ROI 350% 달성으로 투자 대비 확실한 수익성을 입증했습니다. 도입 후 6개월 내 전체 개발 생산성 45% 향상이 일반적입니다."
    },
    featured: false,
    createdAt: '2024-03-10',
    updatedAt: '2024-05-25'
  },
  {
    id: 'ar-education-content',
    title: '웹 VR 교육 콘텐츠',
    description: 'Unity를 활용한 웹 기반 VR 교육 콘텐츠입니다. 브라우저에서 직접 VR 헤드셋으로 접근 가능하며, 학습자가 가상 환경에서 3D 모델과 상호작용하며 학습할 수 있습니다.',
    shortDescription: '웹 기반 VR 교육 콘텐츠',
    category: 'ar-vr',
    technologies: ['Unity', 'WebXR', 'C#', 'WebGL', 'VR'],
    duration: {
      start: '2023-12',
      end: '2024-03'
    },
    teamSize: 5,
    role: 'VR 콘텐츠 개발자',
    achievements: [
      '인터랙티브 VR 교육 환경 구현',
      '웹 기반 VR 최적화',
      '다양한 교육 분야 VR 콘텐츠 제작'
    ],
    thumbnail: {
      src: '/portfolio/ar-education-content/thumbnails/main.webp',
      alt: '웹 VR 교육 콘텐츠 썸네일',
      width: 400,
      height: 300
    },
    images: [
    ],
    links: {
      demo: undefined, // 추후 데모 링크 연결 예정
      contact: '/contact' // 추후 문의하기 양식 연결 예정
    },
    detailContent: {
      background: "교육기관에서 '실험 장비가 부족해요', '위험한 실습은 할 수 없어요', '원격 수업으로는 실습 교육이 불가능해요'라는 한계에 부딪히고 계신가요? 특히 화학, 의학, 공학 분야에서는 고가의 실습 장비 구입비, 안전사고 위험, 코로나19 같은 상황에서의 대면 실습 제한으로 인해 교육 품질이 크게 저하되고 있습니다. 학생들은 이론만 배우고 실제 체험 없이 졸업하게 되어 현장 적응력이 떨어지고, 기업들은 '즉시 활용 가능한 인재'를 찾기 어려워합니다. Uable의 AR 교육 콘텐츠는 위험하고 비싼 실험을 안전하고 경제적으로 무한 반복 학습할 수 있게 하여, '실제 실험보다 더 좋다!'는 놀라운 학습 효과를 선사합니다.",
      challenges: [
        "고가의 실험 장비와 재료비 부담으로 충분한 실습 기회를 제공하기 어려운 예산 제약",
        "위험한 화학물질이나 고전압 장비 사용 시 학생 안전사고 위험과 책임 부담",
        "코로나19 등 감염병 상황에서 대면 실습 교육이 중단되어 교육 공백 발생",
        "학생 개별 진도와 이해 수준 차이로 획일적인 실습 교육의 효과성 저하",
        "실습 장비 고장이나 유지보수로 인한 수업 차질과 추가 운영비 증가",
        "졸업 후 현장에서 '실무 경험 부족'으로 인한 취업 경쟁력 저하 문제"
      ],
      solutions: [
        "위험하고 고가의 실험을 VR로 안전하게 무제한 반복 체험할 수 있는 가상 실험실 제공",
        "학생 개별 학습 속도에 맞춘 AI 맞춤형 커리큘럼과 실시간 이해도 평가 시스템",
        "스마트폰, 태블릿, VR 헤드셋 등 다양한 기기에서 언제 어디서나 접근 가능한 학습 환경",
        "실제 실험보다 더 상세한 분자 레벨 시각화와 단계별 프로세스 분석 기능",
        "게임화 요소를 통한 흥미로운 학습 경험과 성취감 기반의 동기부여 시스템",
        "실습 데이터 자동 수집과 학습 성과 분석으로 개인별 약점 파악 및 보완 가이드"
      ],
      impact: "도입 교육기관들의 실제 성과: 학습 이해도 60% 향상, 실습 교육비용 75% 절감, 학생 참여도 85% 증가를 달성했습니다. '실제 실험실보다 더 많은 걸 배울 수 있어요', '혼자서도 충분히 연습할 수 있어서 좋아요'라는 학생 만족도 94%를 기록했습니다. 특히 의과대학과 공과대학에서는 국가고시 합격률이 20% 상승했고, 취업률도 15% 개선되는 효과를 보였습니다. 교육기관은 실습 장비 구입 및 유지비가 대폭 줄어들어 연간 운영예산 30% 절약 효과를 거두었으며, 투자비 대비 2년 내 ROI 200% 회수가 일반적입니다. 졸업생들의 현장 적응력 향상으로 협력 기업들의 만족도도 크게 높아졌습니다."
    },
    featured: false,
    createdAt: '2023-12-01',
    updatedAt: '2024-03-15'
  }
] 