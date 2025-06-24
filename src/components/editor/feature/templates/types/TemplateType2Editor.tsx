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

type TemplateTypeProps = {
  data: TemplatesData;
};

const TemplateType2Editor = ({ data }: TemplateTypeProps) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[393px] mx-auto pt-[20px] pb-[42px]">
        <div className="flex flex-col items-center relative">
          <Image src="/assets/img/templates/type_2/wedding_day.svg" alt="wedding_day" width={230} height={40} className="absolute mb-10" />

          <div className="w-full h-auto">
            <Image src={data?.main?.main_img || '/assets/img/templates/type_2/main_img.png'} alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto mt-12" />
          </div>
          <div className="mt-10">
            <MainCover type={data?.main?.main_text_type} data={data} />
          </div>
          <div className="flex flex-col gap-8 w-full">
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

TemplateType2Editor.propTypes = {};

export default TemplateType2Editor;
