'use';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import MainTextRenderer from '../custom/MainTextRenderer';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
type TemplateTypeProps = {
  data: any;
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

const Date = styled.div`
  position: absolute;
  color: WHITE;
  bottom: -0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 64px;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.8;
`;
const TemplateType4 = ({ data }: TemplateTypeProps) => {
  const router = useRouter();
  console.log('data', data);
  return (
    <div className="w-full min-h-screen bg-light-beige-300">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center">
          <Image src="/assets/img/templates/type_4/the_wedding_of.svg" alt="the_wedding_of" width={300} height={40} className="mb-2 z-2" />
          <Image src="/assets/img/templates/type_4/flower_1.png" alt="flower_1" width={300} height={40} className="absolute -right-10 bottom-10" />
          <Image src="/assets/img/templates/type_4/flower_2.png" alt="flower_2" width={300} height={40} className="absolute -left-10 top-20" />
          <Image src="/assets/img/templates/type_4/flower_3.png" alt="flower_3" width={150} height={40} className="absolute left-10 bottom-70" />
          {/* <Image
    src="/assets/img/templates/type_4/main_img.png"
    alt="main_img"
    fill
    className="object-cover absolute left-0 right-0 mx-auto w-full h-auto" */}

          <MainImage>
            <Image src="/assets/img/templates/type_4/main_img.png" alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto" />
          </MainImage>
          <div className="mt-14 z-2">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType4.propTypes = {};

export default TemplateType4;
