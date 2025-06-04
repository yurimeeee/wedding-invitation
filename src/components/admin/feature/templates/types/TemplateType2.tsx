'use';

import AccountInfo from '../custom/AccountInfo';
import ContactInfo from '../custom/ContactInfo';
import CopyAndShare from '../custom/CopyAndShare';
import Gallery from '../custom/Gallery';
import Image from 'next/image';
import MainTextRenderer from '../custom/MainTextRenderer';
import React from 'react';
import { TemplatesData } from '@type/templates';
import WeddingCalendar from '../custom/WeddingCalendar';
import WeddingLocation from '../custom/WeddingLocation';

type TemplateTypeProps = {
  data: TemplatesData;
};

const TemplateType2 = ({ data }: TemplateTypeProps) => {
  // const router = useRouter();
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[393px] mx-auto pt-[20px] pb-[42px]">
        <div className="flex flex-col items-center relative">
          <Image src="/assets/img/templates/type_2/wedding_day.svg" alt="wedding_day" width={230} height={40} className="absolute mb-10" />

          <div className="w-full h-auto">
            {/* <Image src="/assets/img/templates/type_2/main_img.png" alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto mt-12" /> */}
            <Image src={data?.main?.main_img || '/assets/img/templates/type_2/main_img.png'} alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto mt-12" />
          </div>
          <div className="mt-10">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <ContactInfo data={data} />
            <Gallery gallery={data?.gallery} />
            <WeddingCalendar weddingDate={data?.main?.date} data={data} />
            <AccountInfo data={data} />
            <WeddingLocation data={data} />
            <CopyAndShare data={data} />
          </div>
          <div className="border-t border-gray-300 w-full">
            <Image src="/assets/img/logo-invi.svg" alt="logo" width={132} height={40} className="mt-4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType2.propTypes = {};

export default TemplateType2;
