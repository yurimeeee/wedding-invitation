'use client';

import { ArrowRight, X } from 'lucide-react';
import { GRAY_500, PINK_300 } from '@styles/colors';
import { GuestMessageData, TemplatesData } from '@type/templates';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import GuestMessageDeleteModal from './modal/GuestMessageDeleteModal';
import GuestMessageModal from './modal/GuestMessageModal';
import { PiFlowerFill } from 'react-icons/pi';
import { db } from '@lib/firebase';
import { formatUnixTimestamp } from '@utils/func';
import styled from '@emotion/styled';
import theme from '@styles/theme';

// const CallButton = styled.a`
//   width: 28px;
//   height: 28px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0dfd8;
// `;
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

type GuestMessageProps = {
  data: TemplatesData;
};

const GuestMessage = ({ data }: GuestMessageProps) => {
  const [guestMessageModal, setGuestMessageModal] = useState<any>({ open: false, title: '' });
  const [guestMessageDeleteModal, setGuestMessageDeleteModal] = useState<any>({ open: false, title: '', id: '', password: '' });
  const [messageList, setMessageList] = useState<GuestMessageData[]>([]);

  const fetchInvitationsList = async () => {
    try {
      // const querySnapshot = await getDocs(collection(db, 'invitation'));
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
  console.log('messageList', messageList);
  useEffect(() => {
    fetchInvitationsList();
  }, []);
  return (
    // <div className="w-full font-suite flex flex-col gap-2">
    <div className="w-full font-chosun flex flex-col gap-2">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">MESSAGE</p>
      {/* <div className="flex flex-col items-center font-chosun my-6 px-8 border-t border-gray-300 pt-6 font-chosun"> */}

      <div className="flex flex-col gap-4 mt-4">
        {messageList?.map((item, idx) => (
          <div key={idx} className="relative bg-white text-[#666666] text-sm border rounded-md p-8 shadow-md whitespace-pre-wrap w-full">
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => {
                setGuestMessageDeleteModal({ ...guestMessageDeleteModal, open: true, id: item?.id, password: item?.password });
              }}
            >
              <X color="#666666" size={16} />
            </div>
            <p className="text-text-default text-base mb-5">{item.contents}</p>
            <div className="flex justify-between">
              <p>
                <span className="text-pink-600">Form.</span> {item.name}
              </p>
              <p>{formatUnixTimestamp(item?.createdAt?.seconds, item?.createdAt?.nanoseconds)}</p>
            </div>
          </div>
        ))}
      </div>
      <CallButton
        className="mt-10"
        onClick={() => {
          setGuestMessageModal({ ...guestMessageModal, open: true });
        }}
      >
        메세지 남기기
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

export default GuestMessage;
