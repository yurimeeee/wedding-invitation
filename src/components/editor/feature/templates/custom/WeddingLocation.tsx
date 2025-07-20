'use client';

import { Bus, CircleParking, TramFront } from 'lucide-react';

import KakaoMap from '../../KakaoMap';
import React from 'react';
import { TemplatesData } from '@type/templates';
import theme from '@styles/theme';

type WeddingLocationProps = {
  address: TemplatesData['address'];
  address_name: TemplatesData['address_name'];
  address_detail: TemplatesData['address_detail'];
  hall_phone: TemplatesData['hall_phone'];
  directions_desc: TemplatesData['directions_desc'];
};

const WeddingLocation = React.memo(({ address, address_name, address_detail, hall_phone, directions_desc }: WeddingLocationProps) => {
  return (
    <div className="w-full font-suite flex flex-col gap-2">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">오시는 길</p>
      <div className="font-chosun text-center text-base mb-5">
        <p>{address || '서울 강남구 영동대로 707'}</p>
        <p>
          {address_name || '드레스가든'} {address_detail || 'Banquet Hall'}
        </p>
        <p>
          TEL. <a href={`tel:${hall_phone}`}>{hall_phone || '0507-1339-1021'}</a>
        </p>
      </div>
      <KakaoMap address={address || '서울특별시 강남구 영동대로 707'} />
      <div className="font-suite text-left text-base mt-4 flex flex-col gap-2 px-6 ">
        {directions_desc
          ?.filter((item: any) => item?.desc?.some((desc: string) => desc.trim() !== ''))
          ?.map((item: any, index: number) => {
            return (
              <div key={index} className="text-text-default">
                <p className="mb-1 font-suite-medium flex items-center gap-[6px]">
                  {item.type === '지하철' ? (
                    <TramFront size={16} color={theme.color.gray_600} />
                  ) : item.type === '버스' ? (
                    <Bus size={16} color={theme.color.gray_600} />
                  ) : (
                    <CircleParking size={16} color={theme.color.gray_600} />
                  )}
                  {item?.type}
                </p>
                {item?.desc?.map(
                  (descItem: any, idx: number) =>
                    descItem?.trim() !== '' && (
                      <div key={idx} className="font-suite">
                        <p>{descItem}</p>
                      </div>
                    )
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default WeddingLocation;
