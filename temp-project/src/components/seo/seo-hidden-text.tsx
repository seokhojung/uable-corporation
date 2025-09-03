// 합법적인 SEO 숨김 텍스트 컴포넌트
// 스크린 리더는 읽지만 화면에는 안 보임 (접근성 + SEO)

export function SeoHiddenText() {
  return (
    <>
      {/* sr-only 클래스: 화면에 안 보이지만 검색엔진과 스크린리더는 읽음 */}
      <h2 className="sr-only">
        Uable Corporation 주요 서비스 - 3D 개발, AR 개발, WebXR 개발
      </h2>
      
      <div className="sr-only">
        <h3>제공 서비스</h3>
        <ul>
          <li>3D 제품 컨피규레이터 개발</li>
          <li>AR 마케팅 솔루션 제작</li>
          <li>WebXR 가상 쇼룸 구축</li>
          <li>Three.js 웹 3D 개발</li>
          <li>React Three Fiber 전문 개발</li>
        </ul>
        
        <h3>기술 스택</h3>
        <ul>
          <li>Three.js - 웹 3D 그래픽 라이브러리</li>
          <li>React Three Fiber - React 3D 렌더링</li>
          <li>AR.js - 웹 기반 증강현실</li>
          <li>WebXR API - 브라우저 VR/AR</li>
        </ul>
        
        <h3>지역</h3>
        <p>서울 강남구 언주로 97길 7 - 강남 3D 개발 전문 업체</p>
      </div>
    </>
  )
}

// Tailwind CSS의 sr-only 클래스:
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// }