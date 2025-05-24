'use client';

import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      kakao.maps.load(() => {
        const container = containerRef.current;
        if (!container) return;

        // 지도 생성
        // @ts-ignore
        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });

        // 주소 검색
        // @ts-ignore
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          // @ts-ignore
          if (status === kakao.maps.services.Status.OK) {
            // @ts-ignore
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
            new kakao.maps.Marker({
              map,
              position: coords,
            });
          } else {
            console.error('주소 검색 실패:', status);
          }
        });
      });
    };
  }, []);

  return (
    <div className="px-4 w-full">
      <div ref={containerRef} style={{ width: '100%', height: '224px' }} />
    </div>
  );
};

export default KakaoMap;
