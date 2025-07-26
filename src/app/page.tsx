'use client';

import { CustomButton } from '@components/ui/CustomButton';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-items-center min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-88px)]">
      <VideoWrapper>
        <video
          src="https://firebasestorage.googleapis.com/v0/b/my-wedding-76cc0.firebasestorage.app/o/main%2F7268830-uhd_4096_2160_25fps.mp4?alt=media&token=7e29c774-e5a2-4bd3-ad95-a95fc7241bc1"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/img/main-poster.png"
        />
        <Overlay>
          <p className="font-chosun-bold text-center text-white text-6xl">Save the Date</p>
          <p className="font-suit-medium text-center text-white text-xl mt-6">간단하게 직접 만드는 나만의 청첩장</p>
          <p className="font-suit-medium text-center text-white text-xl mt-1">가장 섬세하고 특별한 웨딩 초대</p>
          <CustomButton text="시작하기" onClick={() => router.push('/editor')} className="mt-10 max-w-[100px]" active />
        </Overlay>
      </VideoWrapper>
    </div>
  );
}
const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 66px);
    object-fit: cover;
    filter: blur(3px) brightness(0.8);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
