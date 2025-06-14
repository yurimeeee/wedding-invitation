'use client';

import { ArrowRight, X } from 'lucide-react';
import { GuestMessageData, TemplatesData } from '@type/templates';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import GuestMessageDeleteModal from './modal/GuestMessageDeleteModal';
import GuestMessageModal from './modal/GuestMessageModal';
import { db } from '@lib/firebase';
import { formatUnixTimestamp } from '@utils/func';
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
};

const AttendeesInfo = ({ data }: AttendeesInfoProps) => {
  const [guestMessageModal, setGuestMessageModal] = useState<any>({ open: false, title: '' });
  const [guestMessageDeleteModal, setGuestMessageDeleteModal] = useState<any>({ open: false, title: '', id: '', password: '' });
  const [messageList, setMessageList] = useState<GuestMessageData[]>([]);

  const fetchInvitationsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `invitation/${data?.id}/message`));
      const msgData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessageList(msgData as GuestMessageData[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  useEffect(() => {
    fetchInvitationsList();
  }, []);
  return !data?.attendance_display ? null : (
    <div className="w-full font-chosun flex flex-col gap-2 px-8">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">RSVP</p>

      <div className="flex flex-col gap-4 mt-4"></div>
      <CallButton
        className="mt-10"
        onClick={() => {
          setGuestMessageModal({ ...guestMessageModal, open: true });
        }}
      >
        참석 의사 체크하기
        <ArrowRight size={16} />
      </CallButton>
      <GuestMessageModal open={guestMessageModal.open} onOpenChange={setGuestMessageModal} data={data} fetchInvitationsList={fetchInvitationsList} />
      <GuestMessageDeleteModal
        open={guestMessageDeleteModal.open}
        onOpenChange={setGuestMessageDeleteModal}
        msgId={guestMessageDeleteModal.id}
        invitationId={data?.id}
        password={guestMessageDeleteModal.password}
        fetchInvitationsList={fetchInvitationsList}
      />
    </div>
  );
};

export default AttendeesInfo;
