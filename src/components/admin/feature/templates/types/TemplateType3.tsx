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
  max-width: 320px;
  height: 428px;
  object-fit: cover;
  overflow: hidden;
  border-top-left-radius: 180px;
  border-top-right-radius: 180px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
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
const TemplateType3 = ({ data }: TemplateTypeProps) => {
  const router = useRouter();
  console.log('data', data);
  return (
    <div className="w-full min-h-screen bg-light-beige-300">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center">
          <Image src="/assets/img/templates/type_3/the_wedding_of.svg" alt="the_wedding_of" width={138} height={40} className="mb-10" />

          <MainImage>
            <Image src="/assets/img/templates/type_3/main_img.png" alt="main_img" width={0} height={0} sizes="100vw" className="w-full h-auto" />
            <Date>12.24</Date>
          </MainImage>
          <div className="mt-14">
            <MainTextRenderer type={data?.main?.main_text_type} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType3.propTypes = {};

export default TemplateType3;
