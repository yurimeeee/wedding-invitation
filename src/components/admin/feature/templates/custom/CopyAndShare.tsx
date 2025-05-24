'use client';

import { IoLink } from 'react-icons/io5';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { TemplatesData } from '@type/templates';
import { handleCopy } from '../../../../../utils/func';
import styled from '@emotion/styled';
import { useEffect } from 'react';
type CopyAndShareProps = {
  data: TemplatesData;
};
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
}
const CircleButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all.3s;
  cursor: pointer;
`;

const CopyAndShare = ({ data }: CopyAndShareProps) => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
  // useEffect(() => {
  //   // @ts-ignore
  //   if (window.Kakao && !window.Kakao.isInitialized()) {
  //     // @ts-ignore
  //     window.Kakao.init(apiKey); // 카카오 JavaScript 키로 초기화
  //   }
  // }, []);

  // useEffect(() => {
  //   const scriptId = 'kakao-sdk';

  //   // 이미 스크립트가 있으면 중복 삽입 방지
  //   if (document.getElementById(scriptId)) return;

  //   const script = document.createElement('script');
  //   script.id = scriptId;
  //   script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
  //   script.async = true;
  //   script.onload = () => {
  //     if (window.Kakao && !window.Kakao.isInitialized()) {
  //       window.Kakao.init('YOUR_APP_KEY'); // ✅ 카카오 JavaScript 키로 초기화
  //       console.log('Kakao SDK Initialized');
  //     }
  //   };

  //   document.head.appendChild(script);
  // }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // @ts-ignore
        window.Kakao.init(apiKey); // 여기 실제 키 입력
        console.log('Kakao SDK Initialized');
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleShareKakao = () => {
    // @ts-ignore
    if (!window.Kakao?.isInitialized()) return;
    // @ts-ignore
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '청첩장 제목',
        description: '결혼식에 초대합니다',
        imageUrl: 'https://yourdomain.com/assets/thumbnail.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  // const handleShareKakao = () => {
  //   // @ts-ignore
  //   if (!window.Kakao) return alert('카카오 SDK 로딩 실패');
  //   const url = window.location.href;
  //   // @ts-ignore
  //   window.Kakao.Share.sendDefault({
  //     objectType: 'feed',
  //     content: {
  //       title: '청첩장 링크 공유',
  //       description: '우리의 소중한 날에 초대합니다 💌',
  //       imageUrl: 'https://yourdomain.com/default-thumbnail.png', // 대표 이미지
  //       link: {
  //         mobileWebUrl: url,
  //         webUrl: url,
  //       },
  //     },
  //     buttons: [
  //       {
  //         title: '청첩장 보기',
  //         link: {
  //           mobileWebUrl: url,
  //           webUrl: url,
  //         },
  //       },
  //     ],
  //   });
  // };

  return (
    <div className="my-6">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">공유하기</p>
      <div className="flex gap-3 justify-center items-center font-chosun my-6">
        <CircleButton className="bg-[#FFEB00] hover:bg-[#ffea75]">
          <RiKakaoTalkFill onClick={handleShareKakao} color="#3B1E1E" size={24} />
        </CircleButton>
        <CircleButton className="bg-[#EBF1FF] hover:bg-[#e1eaff]">
          <IoLink onClick={() => handleCopy(window.location.href)} color="#7499CB" size={24} />
        </CircleButton>
      </div>
    </div>
  );
};

export default CopyAndShare;
