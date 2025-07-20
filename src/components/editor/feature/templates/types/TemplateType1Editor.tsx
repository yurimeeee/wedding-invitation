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
import WeddingCalendar from '../custom/WeddingCalendar';
import WeddingLocation from '../custom/WeddingLocation';
import styled from '@emotion/styled';

const MainImage = styled(Image)`
  width: 100%;
  max-width: 250px;
  height: 362px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
`;

const TemplateType1Editor = ({ data }: any) => {
  return (
    <div className="w-full min-h-screen bg-light-beige-100">
      <div className="max-w-[393px] mx-auto py-[42px]">
        <div className="flex flex-col items-center">
          <BackgroundMusicPlayer />
          <Image src="/assets/img/templates/type_1/save_the_date.svg" alt="save_the_date" width={106} height={40} className="mb-6" />
          <Image src="/assets/img/templates/type_1/wedding_day.svg" alt="wedding_day" width={230} height={40} className="mb-10" />
          <MainImage src={data?.main?.main_img || '/assets/img/templates/type_1/main_img.png'} alt="main_img" width={250} height={40} className="mb-10" />

          <div className="mt-10">
            <MainCover type={data?.main?.main_text_type} data={data} />
          </div>
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

TemplateType1Editor.propTypes = {};

export default TemplateType1Editor;
