'use client';

import { IoLink } from 'react-icons/io5';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { TemplatesData } from '@type/templates';
import { handleCopy } from '../../../../../utils/func';
import styled from '@emotion/styled';
import { useEffect } from 'react';
type ShareLinksProps = {
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

const ShareLinks = ({ data }: ShareLinksProps) => {
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
        title: data?.main?.main_title,
        description: `${data?.groom_last_name} ${data?.bride_last_name}의 결혼식에 초대합니다`,
        imageUrl: data?.main?.main_img,
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

export default ShareLinks;
