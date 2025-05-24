'use';

import Image from 'next/image';
import MainTextRenderer from '../custom/MainTextRenderer';
import React from 'react';
import { TemplatesData } from '@type/templates';

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
            <Image src="/assets/img/templates/type_2/main_img.png" alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto mt-12" />
          </div>
          <div className="mt-10">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType2.propTypes = {};

export default TemplateType2;
