'use client';

import { ArrowRight, X } from 'lucide-react';
import { GuestMessageData, TemplatesData } from '@type/templates';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

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

type GuestMessageProps = {
  guestbook_display: TemplatesData['guestbook_display'];
  guestbook_title: TemplatesData['guestbook_title'];
  guestbook_desc: TemplatesData['guestbook_desc'];
  id?: string;
};

const GuestMessage = React.memo(({ guestbook_display, guestbook_title, guestbook_desc, id }: GuestMessageProps) => {
  const [guestMessageModal, setGuestMessageModal] = useState<any>({ open: false, title: '' });
  const [guestMessageDeleteModal, setGuestMessageDeleteModal] = useState<any>({ open: false, title: '', id: '', password: '' });
  const [messageList, setMessageList] = useState<GuestMessageData[]>([]);

  const fetchInvitationsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `invitations/${id}/message`));
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
  return !guestbook_display ? null : (
    <div className="w-full font-chosun flex flex-col gap-2 px-8">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5">MESSAGE</p>

      {guestbook_title && <p className="font-chosun-bold text-text-default text-center text-base">{guestbook_title}</p>}
      {guestbook_desc && <p className="font-chosun-bold text-gray-500 text-center font-size">{guestbook_desc}</p>}

      <div className="flex flex-col gap-4 mt-4">
        {messageList?.length < 1 && (
          <div>
            <p className="text-[#666666] text-center">아직 작성된 방명록이 없습니다.</p>
            <p className="text-[#666666] text-center">신랑 신부에게 소중한 첫 메시지를 남겨보세요.</p>
          </div>
        )}
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
      <GuestMessageModal open={guestMessageModal.open} onOpenChange={setGuestMessageModal} id={id} fetchInvitationsList={fetchInvitationsList} />
      <GuestMessageDeleteModal
        open={guestMessageDeleteModal.open}
        onOpenChange={setGuestMessageDeleteModal}
        msgId={guestMessageDeleteModal.id}
        invitationId={id}
        password={guestMessageDeleteModal.password}
        fetchInvitationsList={fetchInvitationsList}
      />
    </div>
  );
});

export default GuestMessage;
