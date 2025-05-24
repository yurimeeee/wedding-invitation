'use';

import { Button } from '@components/ui/button';
import Contact from '../custom/Contact';
import Image from 'next/image';
import KakaoMap from '../../KakaoMap';
import MainTextRenderer from '../custom/MainTextRenderer';
import { Map } from 'react-kakao-maps-sdk';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
type TemplateTypeProps = {
  data: any;
};

const MainImage = styled.div`
  width: 100%;
  max-width: 250px;
  height: 362px;
  border-radius: 50%;
  object-fit: contain;
  overflow: hidden;
`;

const TemplateType1 = ({ data }: TemplateTypeProps) => {
  const router = useRouter();
  console.log('data', data);
  return (
    <div className="w-full min-h-screen bg-light-beige-100">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center">
          <Image src="/assets/img/templates/type_1/save_the_date.svg" alt="save_the_date" width={106} height={40} className="mb-6" />
          <Image src="/assets/img/templates/type_1/wedding_day.svg" alt="wedding_day" width={230} height={40} className="mb-10" />
          <MainImage>
            <Image src="/assets/img/templates/type_1/main_img.png" alt="main_img" width={250} height={40} className="mb-10" />
          </MainImage>
          <div className="mt-10">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
          <Contact data={data} />
          {/* <KakaoMap address="서울특별시 중구 세종대로 110" /> */}
          <KakaoMap />
          <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '1000px', height: '600px' }} level={3} />
        </div>
      </div>
    </div>
  );
};

TemplateType1.propTypes = {};

export default TemplateType1;
