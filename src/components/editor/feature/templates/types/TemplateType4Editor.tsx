'use';

import AccountInfo from '../custom/AccountInfo';
import AttendeesInfo from '../custom/AttendeesInfo';
import FamilyInfo from '../custom/FamilyInfo';
import Gallery from '../custom/Gallery';
import GreetingMessage from '../custom/GreetingMessage';
import GuestMessage from '../custom/GuestMessage';
import Image from 'next/image';
import MainCover from '../custom/MainCover';
import React from 'react';
import ShareLinks from '../custom/ShareLinks';
import { TemplatesData } from '@type/templates';
import WeddingCalendar from '../custom/WeddingCalendar';
import WeddingLocation from '../custom/WeddingLocation';
import styled from '@emotion/styled';
type TemplateTypeProps = {
  data: TemplatesData;
};
const MainImage = styled.div`
  width: 100%;
  max-width: 218px;
  object-fit: cover;
  overflow: hidden;
  border: 10px solid WHITE;
  box-shadow: 0 10px 10px rgba(99, 99, 99, 0), 0 6px 6px rgba(88, 88, 88, 0.082);
  z-index: 2;
`;

const TemplateType4Editor = ({ data }: TemplateTypeProps) => {
  return (
    <div className="w-full min-h-screen bg-light-beige-300 overflow-hidden">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center relative">
          <div className="relative">
            <Image src="/assets/img/templates/type_4/the_wedding_of.svg" alt="the_wedding_of" width={300} height={40} className="mb-2 z-5 mx-auto" />

            <Image src="/assets/img/templates/type_4/flower_1.png" alt="flower_1" width={300} height={40} className="absolute -right-10 bottom-10" style={{ zIndex: 1 }} />
            <Image src="/assets/img/templates/type_4/flower_2.png" alt="flower_2" width={300} height={40} className="absolute -left-10 -top-20" style={{ zIndex: 1 }} />
            <Image src="/assets/img/templates/type_4/flower_3.png" alt="flower_3" width={150} height={40} className="absolute -left-10 bottom-70" style={{ zIndex: 1 }} />

            <MainImage className="relative z-10  mx-auto">
              <Image src={data?.main?.main_img || '/assets/img/templates/type_4/main_img.png'} alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto" />
            </MainImage>

            <div className="mt-14 relative z-5">
              <MainCover type={data?.main?.main_text_type} data={data} />
            </div>
          </div>
          <div className="mt-14 z-2">
            <MainCover type={data?.main?.main_text_type} data={data} />
          </div>
          <div className="flex flex-col gap-16 w-full">
            <GreetingMessage data={data} />
            <FamilyInfo data={data} />
            <Gallery gallery={data?.gallery} />
            <WeddingCalendar weddingDate={data?.main?.date} data={data} />
            <AccountInfo data={data} />
            <WeddingLocation data={data} />
            <AttendeesInfo data={data} />
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

TemplateType4Editor.propTypes = {};

export default TemplateType4Editor;
