'use client';

import { ArrowRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { formatTime, formattedDate } from '@utils/func';

import AttendeesInfoModal from './modal/AttendeesInfoModal';
import { GoHeartFill } from 'react-icons/go';
import { TEXT_DEFAULT } from '@styles/colors';
import { TemplatesData } from '@type/templates';
import { db } from '@lib/firebase';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const CallButton = styled.a`
  width: 100%;
  height: 48px;
  border-radius: 999px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.color.pink500};
  cursor: pointer;
  color: white;
`;

type AttendeesInfoProps = {
  data: TemplatesData;
  attendance_display: TemplatesData['attendance_display'];
  attendance_title: TemplatesData['attendance_title'];
  attendance_desc: TemplatesData['attendance_desc'];
  groom_last_name: TemplatesData['groom_last_name'];
  bride_last_name: TemplatesData['bride_last_name'];
  main: TemplatesData['main'];
};

const AttendeesInfo = React.memo(({ attendance_display, attendance_title, attendance_desc, groom_last_name, bride_last_name, main, data }: AttendeesInfoProps) => {
  const [attendeesInfoModal, setAttendeesInfoModal] = useState<any>({ open: false, title: '' });

  return !attendance_display ? null : (
    <div className="w-full font-chosun flex flex-col gap-2 px-8">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">RSVP</p>
      {attendance_title && <p className="font-chosun-bold text-text-default text-center text-base">{attendance_title}</p>}
      {attendance_desc && <p className="font-chosun-bold text-gray-500 text-center font-size">{attendance_desc}</p>}

      <div className="mt-4 bg-pink-100 rounded-md p-4 shadow-md text-center">
        <p className="text-text-default font-semibold mb-4 flex gap-2 items-center justify-center">
          신랑 {groom_last_name || '철수'} <GoHeartFill color={TEXT_DEFAULT} /> 신부 {bride_last_name || '영희'}
        </p>
        <p className="text-gray-700">{formattedDate(main?.date) || '2025년 6월 24일 토요일'}</p>
        <p className="text-gray-700 ml-1">{formatTime(main?.time) || '오후 2시'}</p>
      </div>
      <CallButton
        className="mt-4"
        onClick={() => {
          setAttendeesInfoModal({ ...attendeesInfoModal, open: true });
        }}
      >
        참석 의사 체크하기
        <ArrowRight size={16} />
      </CallButton>
      <AttendeesInfoModal open={attendeesInfoModal.open} onOpenChange={setAttendeesInfoModal} data={data} />
    </div>
  );
});

export default AttendeesInfo;
