'use client';

import React, { useEffect } from 'react';

import { IoLink } from 'react-icons/io5';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { TemplatesData } from '@type/templates';
import { handleCopy } from '../../../../../utils/func';
import styled from '@emotion/styled';

type ShareLinksProps = {
  share_kakao_title: TemplatesData['share_kakao_title'];
  share_kakao_desc: TemplatesData['share_kakao_desc'];
  share_kakao_img: TemplatesData['share_kakao_img'];
  groom_last_name: TemplatesData['groom_last_name'];
  bride_last_name: TemplatesData['bride_last_name'];
  main: TemplatesData['main'];
};
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
}
const CircleButton = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all.3s;
  cursor: pointer;
`;

const ShareLinks = React.memo(({ share_kakao_title, share_kakao_desc, share_kakao_img, groom_last_name, bride_last_name, main }: ShareLinksProps) => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // @ts-ignore
        window.Kakao.init(apiKey); // 여기 실제 키 입력
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
        title: share_kakao_title || main?.main_title,
        description: share_kakao_desc || `${groom_last_name} ${bride_last_name}의 결혼식에 초대합니다`,
        imageUrl: share_kakao_img || main?.main_img,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '모바일 청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <div className="my-6 px-8">
      <div className="flex flex-col gap-3 justify-center items-center font-chosun my-6">
        <CircleButton className="bg-[#FFEB00] hover:bg-[#ffea75] flex gap-2">
          카카오톡으로 청첩장 전하기
          <RiKakaoTalkFill onClick={handleShareKakao} color="#3B1E1E" size={24} />
        </CircleButton>
        <CircleButton className="bg-[#EBF1FF] hover:bg-[#e1eaff] flex gap-2">
          청첩장 주소 복사하기
          <IoLink onClick={() => handleCopy(window.location.href)} color="#7499CB" size={24} />
        </CircleButton>
      </div>
    </div>
  );
});

export default ShareLinks;
