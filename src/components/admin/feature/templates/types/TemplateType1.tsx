'use';

import AccountInfo from '../custom/AccountInfo';
import BackgroundMusicPlayer from '../custom/BackgroundMusicPlayer';
import FamilyInfo from '../custom/FamilyInfo';
import Gallery from '../custom/Gallery';
import GreetingMessage from '../custom/GreetingMessage';
import GuestMessage from '../custom/GuestMessage';
import Image from 'next/image';
import MainCover from '../custom/MainCover';
import React from 'react';
import ShareLinks from '../custom/ShareLinks';
import WeddingCalendar from '../custom/WeddingCalendar';
import WeddingLocation from '../custom/WeddingLocation';
import styled from '@emotion/styled';

const MainImage = styled.div`
  width: 100%;
  max-width: 250px;
  height: 362px;
  border-radius: 50%;
  object-fit: contain;
  overflow: hidden;
`;

const TemplateType1 = ({ data }: any) => {
  // const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-light-beige-100">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center">
          <BackgroundMusicPlayer />
          <Image src="/assets/img/templates/type_1/save_the_date.svg" alt="save_the_date" width={106} height={40} className="mb-6" />
          <Image src="/assets/img/templates/type_1/wedding_day.svg" alt="wedding_day" width={230} height={40} className="mb-10" />
          <MainImage>
            <Image src={data?.main?.main_img || '/assets/img/templates/type_1/main_img.png'} alt="main_img" width={250} height={40} className="mb-10" />
            {/* <Image src="/assets/img/templates/type_1/main_img.png" alt="main_img" width={250} height={40} className="mb-10" /> */}
          </MainImage>
          <div className="mt-10">
            <MainCover type={data?.main?.main_text_type} data={data} />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <GreetingMessage data={data} />
            <FamilyInfo data={data} />
            <Gallery gallery={data?.gallery} />
            <WeddingCalendar weddingDate={data?.main?.date} data={data} />
            <AccountInfo data={data} />
            <WeddingLocation data={data} />
            <GuestMessage data={data} />
            <ShareLinks data={data} />
          </div>
          <div className="border-t border-gray-300 w-full">
            <Image src="/assets/img/logo-invi.svg" alt="logo" width={132} height={40} className="mt-4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType1.propTypes = {};

export default TemplateType1;
