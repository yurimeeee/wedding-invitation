'use';

import AccountInfo from '../custom/AccountInfo';
import ContactInfo from '../custom/ContactInfo';
import CopyAndShare from '../custom/CopyAndShare';
import Gallery from '../custom/Gallery';
import Image from 'next/image';
import MainTextRenderer from '../custom/MainTextRenderer';
import React from 'react';
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
          <Image src="/assets/img/templates/type_1/save_the_date.svg" alt="save_the_date" width={106} height={40} className="mb-6" />
          <Image src="/assets/img/templates/type_1/wedding_day.svg" alt="wedding_day" width={230} height={40} className="mb-10" />
          <MainImage>
            <Image src={data?.main?.main_img || '/assets/img/templates/type_1/main_img.png'} alt="main_img" width={250} height={40} className="mb-10" />
            {/* <Image src="/assets/img/templates/type_1/main_img.png" alt="main_img" width={250} height={40} className="mb-10" /> */}
          </MainImage>
          <div className="mt-10">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <ContactInfo data={data} />
            <Gallery gallery={data?.gallery} />
            <WeddingCalendar weddingDate="2025-10-12" />
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

TemplateType1.propTypes = {};

export default TemplateType1;
