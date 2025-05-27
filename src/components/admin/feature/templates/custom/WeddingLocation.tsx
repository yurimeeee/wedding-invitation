'use client';

import KakaoMap from '../../KakaoMap';
import { TemplatesData } from '@type/templates';

type WeddingLocationProps = {
  data: TemplatesData;
};

const WeddingLocation = ({ data }: WeddingLocationProps) => {
  return (
    <div className="w-full font-suite flex flex-col gap-2">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">오시는 길</p>
      <div className="font-chosun text-center text-base mb-5">
        <p>{data?.address || '서울 강남구 영동대로 707'}</p>
        <p>{data?.address_detail || '드레스가든 2F Banquet Hall'}</p>
        <p>
          TEL. <a href={`tel:${data?.hall_phone}`}>{data?.hall_phone || '0507-1339-1021'}</a>
        </p>
      </div>
      <KakaoMap address={data?.address || '서울특별시 강남구 영동대로 707'} />
      <div className="font-chosun text-left text-base mt-4 flex flex-col gap-2 px-4">
        {data?.directions_desc?.map((item: any, index: number) => (
          <div key={index}>
            <p className="mb-1 font-chosun-medium">{item?.type}</p>
            {item?.desc?.map((descItem: any, idx: number) => (
              <div key={idx}>
                <p>{descItem}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingLocation;
