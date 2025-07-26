'use';

import AccountInfo from '../custom/AccountInfo';
import AttendeesInfo from '../custom/AttendeesInfo';
import BackgroundMusicPlayer from '../custom/BackgroundMusicPlayer';
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

const TemplateType4 = ({ data }: TemplateTypeProps) => {
  // const router = useRouter();
  return (
    <div className="w-full min-h-screen bg-light-beige-300 overflow-hidden">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="relative">
          {data?.bgm_url && <BackgroundMusicPlayer bgm={data?.bgm_url} display={data?.bgm_display} />}
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

        <div className="flex flex-col items-center relative">
          <div className="flex flex-col gap-16 w-full">
            <GreetingMessage
              main_title={data?.main?.main_title}
              main_title_align={data?.main?.main_title_align}
              intro_content={data?.main?.intro_content}
              intro_content_size={data?.main?.intro_content_size}
              intro_content_align={data?.main?.intro_content_align}
              intro_name_display={data?.main?.intro_name_display}
              name_display_order={data?.name_display_order}
              groom_first_name={data?.groom_first_name}
              groom_last_name={data?.groom_last_name}
              bride_first_name={data?.bride_first_name}
              bride_last_name={data?.bride_last_name}
            />
            <FamilyInfo data={data} />
            <Gallery gallery={data?.gallery} />
            <WeddingCalendar
              weddingDate={data?.main?.date}
              date={data?.main?.date}
              time={data?.main?.time}
              calendar_display={data?.calendar_display}
              countdown_display={data?.countdown_display}
              d_day_display={data?.d_day_display}
            />
            <AccountInfo
              account_layout={data?.account_layout}
              account_design={data?.account_design}
              groom_account={data?.groom_account}
              bride_account={data?.bride_account}
              is_kakao_account={data?.is_kakao_account}
            />
            <WeddingLocation
              address={data?.address}
              address_name={data?.address_name}
              address_detail={data?.address_detail}
              hall_phone={data?.hall_phone}
              directions_desc={data?.directions_desc}
            />
            <AttendeesInfo
              attendance_display={data?.attendance_display}
              attendance_title={data?.attendance_title}
              attendance_desc={data?.attendance_desc}
              groom_last_name={data?.groom_last_name}
              bride_last_name={data?.bride_last_name}
              main={data?.main}
              data={data}
            />
            <GuestMessage guestbook_display={data?.guestbook_display} guestbook_title={data?.guestbook_title} guestbook_desc={data?.guestbook_desc} id={data?.id} />
            <ShareLinks
              share_kakao_title={data?.share_kakao_title}
              share_kakao_desc={data?.share_kakao_desc}
              share_kakao_img={data?.share_kakao_img}
              groom_last_name={data?.groom_last_name}
              bride_last_name={data?.bride_last_name}
              main={data?.main}
            />
          </div>
          <div className="border-t border-gray-300 w-full">
            <Image src="/assets/img/logo-invi.svg" alt="logo" width={132} height={40} className="mt-4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateType4.propTypes = {};

export default TemplateType4;
