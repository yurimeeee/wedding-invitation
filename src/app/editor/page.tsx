'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useInvitationStore, useUserStore } from '@stores/useUserStore';

import AddInvitationModal from '@components/editor/feature/templates/custom/modal/AddInvitationModal';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { GRAY_600 } from '@styles/colors';
import InvitationItem from '@components/editor/feature/InvitationItem';
import { TemplatesData } from '@type/templates';
import { db } from '@lib/firebase';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const AddCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  background-color: ${theme.color.pink100};
  cursor: pointer;
  color: white;
`;

export default function DashbordPage() {
  const user = useUserStore((state) => state.user);
  const invitations = useInvitationStore((state) => state.invitations);
  const setInvitations = useInvitationStore((state) => state.setInvitations);
  const [addInvitationModal, setAddInvitationModal] = useState<boolean>(false);

  // const fetchInvitations = async (userId: string) => {
  //   try {
  //     const colRef = collection(db, 'users', userId, 'invitations');
  //     const querySnapshot = await getDocs(colRef);
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setInvitations(data as TemplatesData[]);
  //   } catch (error) {}
  // };
  const fetchInvitations = async (userId: string) => {
    try {
      const invitationsRef = collection(db, 'invitations');

      // uid 필드가 userId와 같은 문서만 필터링
      const q = query(invitationsRef, where('uid', '==', userId));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvitations(data as TemplatesData[]);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInvitations(user?.uid);
    }
  }, [user?.uid]);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <p className="text-[18px] font-suite-bold text-text-default mb-6 text-center">나만의 청첩장 꾸미기</p>
        <p className="text-sm text-muted-foreground text-center mb-10" style={{ color: ` rgb(209, 146, 146)` }}>
          만들어진 청첩장은 언제든지 수정이 가능해요!
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {invitations?.map((item: TemplatesData, index: number) => (
          <InvitationItem key={index} data={item} onClick={() => {}} />
        ))}
        <AddCard className="rounded border border-solid border-pink-300 p-3">
          <div className="flex flex-col gap-3 items-center justify-center w-full" onClick={() => setAddInvitationModal(true)}>
            <BsFillPlusCircleFill color={theme.color.gray_600} size={20} />
            <p className="text-gray-600 font-suite">청첩장 만들기</p>
          </div>
        </AddCard>
      </div>
      <AddInvitationModal open={addInvitationModal} onOpenChange={setAddInvitationModal} />
    </div>
  );
}
