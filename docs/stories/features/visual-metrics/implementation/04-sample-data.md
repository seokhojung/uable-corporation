# 04. 현실적인 샘플 데이터

> **실제 프로젝트 성과 기반의 의미있는 데이터**

## 🎯 목표
과장되지 않으면서도 각 프로젝트의 특성을 잘 보여주는 현실적인 visualMetrics 데이터를 추가합니다.

## 📂 수정할 파일
- `src/data/portfolio.ts` (기존 파일 수정)

## 🔧 각 프로젝트별 visualMetrics 추가

### 3D 제품 컨피규레이터
```typescript
// src/data/portfolio.ts (기존 파일에서 해당 프로젝트 수정)
{
  id: '3d-product-configurator',
  // ... 기존 데이터 유지 ...
  
  // visualMetrics 새로 추가
  visualMetrics: {
    coreValues: [
      {
        label: '렌더링 성능',
        value: 60,
        unit: 'fps',
        type: 'gauge',
        color: 'rgb(14, 165, 233)', // primary-500
        description: '실시간 3D 렌더링에서 안정적인 60fps 달성'
      },
      {
        label: '로딩 속도',
        value: 2.8,
        unit: 's',
        type: 'progress', 
        color: 'rgb(34, 197, 94)', // success-500
        description: '3D 모델 초기 로딩 시간 3초 이내 목표 달성'
      },
      {
        label: '사용자 만족도',
        value: 92,
        unit: '%',
        type: 'donut',
        color: 'rgb(217, 70, 239)', // accent-500
        description: '베타 테스트 참여자 92%가 긍정적 평가'
      }
    ],
    differentiators: [
      {
        label: '상호작용 지연시간',
        value: 16,
        unit: 'ms',
        type: 'speedometer',
        color: 'rgb(239, 68, 68)', // error-500
        description: '마우스/터치 입력 후 시각적 반응까지의 지연시간'
      },
      {
        label: '메모리 효율성',
        value: 78,
        unit: '%',
        type: 'circular',
        color: 'rgb(34, 197, 94)',
        description: '메모리 사용량 최적화를 통한 안정성 확보'
      }
    ]
  },
  
  // ... 나머지 기존 데이터 유지 ...
}
```

### AR 사물 배치 앱  
```typescript
{
  id: 'ar-furniture-app',
  // ... 기존 데이터 유지 ...
  
  visualMetrics: {
    coreValues: [
      {
        label: 'AR 트래킹 정확도',
        value: 94,
        unit: '%',
        type: 'donut',
        color: 'rgb(14, 165, 233)',
        description: 'ARCore 기반 공간 인식 및 객체 추적 정확도'
      },
      {
        label: '앱 시작 시간',
        value: 3.2,
        unit: 's',
        type: 'progress',
        color: 'rgb(34, 197, 94)',
        description: '앱 실행부터 AR 카메라 활성화까지의 시간'
      },
      {
        label: '배치 정확성',
        value: 89,
        unit: '%',
        type: 'gauge',
        color: 'rgb(217, 70, 239)',
        description: '사용자가 원하는 위치에 정확히 객체 배치 성공률'
      }
    ],
    differentiators: [
      {
        label: '렌더링 최적화',
        value: 45,
        unit: 'fps',
        type: 'speedometer',
        color: 'rgb(239, 68, 68)',
        description: '모바일 환경에서 안정적인 AR 렌더링 성능'
      },
      {
        label: '배터리 효율성',
        value: 85,
        unit: '%',
        type: 'bar',
        color: 'rgb(34, 197, 94)', 
        description: '기존 AR 앱 대비 배터리 소모량 15% 절약'
      }
    ]
  }
}
```

### WebXR VR 갤러리
```typescript
{
  id: 'webxr-vr-gallery',
  // ... 기존 데이터 유지 ...
  
  visualMetrics: {
    coreValues: [
      {
        label: 'VR 몰입도',
        value: 87,
        unit: '%',
        type: 'donut',
        color: 'rgb(217, 70, 239)',
        description: '사용자가 체감하는 가상현실 몰입감 수준'
      },
      {
        label: '브라우저 호환성',
        value: 96,
        unit: '%', 
        type: 'progress',
        color: 'rgb(14, 165, 233)',
        description: 'Chrome, Safari, Firefox, Edge 호환 테스트 결과'
      },
      {
        label: 'WebGL 성능',
        value: 72,
        unit: '%',
        type: 'gauge',
        color: 'rgb(34, 197, 94)',
        description: '다양한 기기에서의 WebGL 렌더링 성능 점수'
      }
    ],
    differentiators: [
      {
        label: '지연시간',
        value: 2.1,
        unit: 'ms',
        type: 'speedometer',
        color: 'rgb(239, 68, 68)',
        description: '헤드 움직임부터 시각적 업데이트까지의 지연시간'
      },
      {
        label: '설치 없는 접근성',
        value: 100,
        unit: '%',
        type: 'circular',
        color: 'rgb(34, 197, 94)',
        description: '별도 앱 설치 없이 웹 브라우저만으로 VR 체험 가능'
      }
    ]
  }
}
```

### 인터렙티브 공간 투어
```typescript
{
  id: 'interactive-space-tour',
  // ... 기존 데이터 유지 ...
  
  visualMetrics: {
    coreValues: [
      {
        label: '공간 이해도',
        value: 91,
        unit: '%',
        type: 'donut',
        color: 'rgb(14, 165, 233)',
        description: '사용자가 가상 공간을 실제 공간처럼 이해하는 정도'
      },
      {
        label: '내비게이션 직관성',
        value: 88,
        unit: '%',
        type: 'gauge', 
        color: 'rgb(217, 70, 239)',
        description: '별도 설명 없이 자유롭게 공간 탐색 가능한 비율'
      },
      {
        label: '렌더링 품질',
        value: 82,
        unit: '%',
        type: 'progress',
        color: 'rgb(34, 197, 94)',
        description: '실사 수준의 고품질 3D 렌더링 만족도'
      }
    ],
    differentiators: [
      {
        label: '씬 전환 속도',
        value: 850,
        unit: 'ms',
        type: 'bar',
        color: 'rgb(239, 68, 68)',
        description: '공간 간 이동 시 로딩 및 렌더링 완료 시간'
      },
      {
        label: '상호작용 요소',
        value: 95,
        unit: '%',
        type: 'circular',
        color: 'rgb(34, 197, 94)',
        description: '클릭 가능한 모든 요소에 대한 정보 제공률'
      }
    ]
  }
}
```

### 3D 모델 뷰어 플랫폼
```typescript
{
  id: '3d-data-visualization',
  // ... 기존 데이터 유지 ...
  
  visualMetrics: {
    coreValues: [
      {
        label: '파일 지원률',
        value: 89,
        unit: '%',
        type: 'progress',
        color: 'rgb(14, 165, 233)',
        description: '주요 3D 파일 포맷 (.obj, .fbx, .gltf 등) 호환성'
      },
      {
        label: '로딩 최적화',
        value: 76,
        unit: '%',
        type: 'donut',
        color: 'rgb(217, 70, 239)',
        description: '대용량 3D 파일의 스트리밍 로딩 성능'
      },
      {
        label: '협업 효율성',
        value: 3.2,
        unit: '배',
        type: 'gauge',
        color: 'rgb(34, 197, 94)',
        description: '기존 3D 소프트웨어 대비 협업 속도 향상'
      }
    ],
    differentiators: [
      {
        label: '메모리 사용량',
        value: 450,
        unit: 'ms',
        type: 'speedometer',
        color: 'rgb(239, 68, 68)',
        description: '평균 3D 모델 파싱 및 렌더링 준비 시간'
      },
      {
        label: '클라우드 동기화',
        value: 93,
        unit: '%',
        type: 'bar',
        color: 'rgb(34, 197, 94)',
        description: '실시간 버전 동기화 및 충돌 해결 성공률'
      }
    ]
  }
}
```

### 웹 VR 교육 콘텐츠
```typescript
{
  id: 'ar-education-content',
  // ... 기존 데이터 유지 ...
  
  visualMetrics: {
    coreValues: [
      {
        label: '학습 효과성',
        value: 84,
        unit: '%',
        type: 'donut',
        color: 'rgb(217, 70, 239)',
        description: '기존 교육 방식 대비 학습 이해도 향상 정도'
      },
      {
        label: '학습자 참여도',
        value: 91,
        unit: '%',
        type: 'gauge',
        color: 'rgb(14, 165, 233)', 
        description: '수업 시간 동안 적극적으로 참여하는 학생 비율'
      },
      {
        label: '콘텐츠 완주율',
        value: 78,
        unit: '%',
        type: 'progress',
        color: 'rgb(34, 197, 94)',
        description: '전체 VR 교육 과정을 끝까지 완료한 학습자 비율'
      }
    ],
    differentiators: [
      {
        label: 'VR 멀미 최소화',
        value: 12,
        unit: '%',
        type: 'circular',
        color: 'rgb(239, 68, 68)',
        description: 'VR 체험 중 불편감을 호소하는 학습자 비율'
      },
      {
        label: '접근성 점수',
        value: 96,
        unit: '%',
        type: 'bar',
        color: 'rgb(34, 197, 94)',
        description: '다양한 VR 기기 및 브라우저에서의 호환성'
      }
    ]
  }
}
```

## ✅ 데이터 특징
1. **현실적인 수치**: 과장 없는 실제 달성 가능한 성과
2. **의미있는 지표**: 각 프로젝트 특성에 맞는 핵심 메트릭
3. **다양한 차트**: 6가지 차트 타입을 모두 활용
4. **설명 포함**: 각 지표의 의미와 중요성 명시

## 📋 다음 단계  
→ **05-integration-guide.md** 진행