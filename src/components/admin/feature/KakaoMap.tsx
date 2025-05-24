// 'use client';

// import { useEffect, useRef } from 'react';

// interface KakaoMapProps {
//   address: string;
// }

// const KakaoMap = ({ address }: KakaoMapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // @ts-ignore
//       kakao.maps.load(() => {
//         const container = mapRef.current;
//         const options = {
//           // @ts-ignore
//           center: new kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치
//           level: 3,
//         };
//         // @ts-ignore
//         const map = new kakao.maps.Map(container, options);
//         // @ts-ignore
//         const geocoder = new kakao.maps.services.Geocoder();

//         // @ts-ignore
//         geocoder.addressSearch(address, function (result, status) {
//           // @ts-ignore
//           if (status === kakao.maps.services.Status.OK) {
//             // @ts-ignore
//             const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//             // @ts-ignore
//             const marker = new kakao.maps.Marker({
//               map,
//               position: coords,
//             });
//             map.setCenter(coords);
//           } else {
//             console.error('주소 검색 실패:', status);
//           }
//         });
//       });
//     };
//   }, [address]);

//   // return <div ref={mapRef} className="w-full h-64" />;
//   return <div ref={mapRef} style={{ width: '100%', height: '300px', border: '1px solid black' }} />;
// };

// export default KakaoMap;
// 'use client';

// import { useEffect, useRef } from 'react';

// const KakaoMap = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // 스크립트 로딩
//     const script = document.createElement('script');
//     // script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // @ts-ignore
//       kakao.maps.load(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         // @ts-ignore
//         const options = {
//           center: new kakao.maps.LatLng(33.450701, 126.570667),
//           level: 3,
//         };

//         // @ts-ignore
//         new kakao.maps.Map(container, options);
//       });
//     };
//   }, []);

//   return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
// };

// export default KakaoMap;

'use client';

import Script from './Script';
import { useRef } from 'react';

// import { useEffect, useState } from 'react';

// import { Map } from 'react-kakao-maps-sdk';

// const KakaoMap = () => {
//   const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [mapReady, setMapReady] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // @ts-ignore
//       kakao.maps.load(() => {
//         setMapReady(true); // kakao.maps API 완전히 로드됨
//       });
//       setScriptLoaded(true);
//     };
//   }, [apiKey]);

//   return (
//     <div>
//       {scriptLoaded && mapReady ? (
//         <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '300px', border: '1px solid black' }} level={3} />
//       ) : (
//         <div>지도 로딩 중...</div>
//       )}
//     </div>
//   );
// };

// export default KakaoMap;

function KakaoMap() {
  const container = useRef<any>(null);
  const init = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(container.current, options);
    });
  };

  return (
    <div>
      <Script async onLoad={init} src={`http://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`} />
      <div>지도 컴포넌트입니다.</div>
      <div ref={container} style={{ width: '400px', height: '500px' }}></div>
    </div>
  );
}

export default KakaoMap;
