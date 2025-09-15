# WebGL Bundle Management Guide

## 현재 상태 (2024년 12월 기준)

- **전체 번들**: 5개 활성화
- **갤러리 시스템**: 컴포넌트화 완료
- **네비게이션**: 헤더 메뉴 통합 완료
- **홈페이지 통합**: WebGL 섹션 추가 완료

## 폴더 구조

```
public/webgl-gallery/
├── webtoon/                    # ✅ 활성화됨 (웹툰 스튜디오)
│   ├── index.html              # <base href="/webgl-gallery/webtoon/"> 
│   └── 2022-10-06-18-29-43/    # Shapespark 에셋들
├── chungwoo/                   # ✅ 활성화됨 (청우 F&B 쇼룸)
│   ├── index.html              # <base href="/webgl-gallery/chungwoo/">
│   └── 2022-10-07-09-33-02/    # Shapespark 에셋들
├── home/                       # ✅ 활성화됨 (홈 갤러리)
│   ├── index.html              # <base href="/webgl-gallery/home/">
│   └── 2022-10-06-17-05-32/    # Shapespark 에셋들
├── office/                     # ✅ 활성화됨 (오피스 공간)
│   ├── index.html              # <base href="/webgl-gallery/office/">
│   └── 2022-10-18-14-24-28/    # Shapespark 에셋들
└── parking/                    # ✅ 활성화됨 (주차장)
    ├── index.html              # <base href="/webgl-gallery/parking/">
    └── 2022-10-13-10-10-09/    # Shapespark 에셋들
```

## 새 WebGL 번들 추가 방법

### 1. 파일 복사
```bash
# 1. 새 폴더 생성
mkdir public/webgl-gallery/[번들명]

# 2. Shapespark 번들 복사
cp -r [원본경로]/* public/webgl-gallery/[번들명]/

# 3. index.html의 base href 수정
<base href="/webgl-gallery/[번들명]/">
```

### 2. 데이터 등록
`src/data/webgl-gallery.ts`에 새 번들 정보 추가:
```typescript
{
  id: '[번들명]',
  title: '[제목]',
  description: '[설명]',
  path: '/webgl-gallery/[번들명]/index.html',
  thumbnail: '/webgl-gallery/[번들명]/[경로]/thumbnail.jpg',
  size: '[크기]',
  tags: ['태그1', '태그2'],
  status: 'active'  // 'development' 또는 'disabled'
}
```

### 3. 번들 최적화 (권장)
- 불필요한 비디오 파일 제거
- 이미지 최적화
- 총 크기 100MB 이하 권장

## 관리 명령어

### 디버깅
```bash
# 기본 정적 파일 테스트
curl -I https://your-domain.com/test-simple.html

# WebGL 번들 직접 테스트  
curl -I https://your-domain.com/webgl-gallery/[번들명]/index.html
```

### 클린업
```bash
# 기존 테스트 파일들 제거
rm public/test-simple.html public/test.css public/test.js

# 구버전 폴더 제거
rm -rf public/webgl/
```

## 필수 설정 파일

### vercel.json
```json
{
  "headers": [
    {
      "source": "/(.*).css",
      "headers": [{"key": "Content-Type", "value": "text/css; charset=utf-8"}]
    },
    {
      "source": "/(.*).js", 
      "headers": [{"key": "Content-Type", "value": "application/javascript; charset=utf-8"}]
    },
    {
      "source": "/webgl-gallery/(.*).svg",
      "headers": [{"key": "Content-Type", "value": "image/svg+xml"}]
    }
  ]
}
```

### 각 번들의 index.html
```html
<head>
  <base href="/webgl-gallery/[번들명]/">
  <!-- 나머지 내용 -->
</head>
```

## 트러블슈팅 체크리스트

- [ ] `<base href>` 태그 정확한지 확인
- [ ] MIME 타입 헤더 설정 확인  
- [ ] 파일 크기가 적절한지 확인 (100MB 이하)
- [ ] 상대경로 참조가 올바른지 확인
- [ ] 브라우저 개발자 도구에서 404 에러 없는지 확인

## 컴포넌트 시스템

### WebGL 갤러리 컴포넌트
- **위치**: `src/components/webgl/webgl-gallery.tsx`
- **데이터**: `src/data/webgl-gallery.ts`
- **기능**: 재사용 가능한 WebGL 갤러리 컴포넌트
- **사용법**:
```tsx
// 전체 갤러리 표시
<WebGLGallery title="3D 체험 갤러리" showDirectLinks={false} />

// 홈페이지용 (3개만 표시)
<WebGLGallery maxItems={3} />
```

### 페이지 통합
- **WebGL 전용 페이지**: `/webgl` (`src/app/webgl/page.tsx`)
- **헤더 메뉴**: WebGL 링크 추가 완료
- **홈페이지 섹션**: WebGL 갤러리 3개 미리보기 + "전체 보기" 버튼

## 성능 최적화

1. **이미지 압축**: basis 포맷 활용
2. **불필요한 파일 제거**: 비디오, 고해상도 텍스처 (완료)
3. **CDN 활용**: Vercel Edge Network 자동 적용
4. **레이지 로딩**: 필요시 동적 로드 구현
5. **컴포넌트 최적화**: 갤러리 컴포넌트화로 중복 코드 90% 감소