'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import InvitationItem from '@components/editor/feature/InvitationItem';
import { TemplatesData } from '@type/templates';
import { db } from '@lib/firebase';
import { toast } from 'sonner';

export default function InvitationListPage() {
  const [invitations, setInvitations] = useState<TemplatesData[]>([]);

  const fetchInvitationsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'invitation'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitations(data as TemplatesData[]);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast.error('목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchInvitationsList();
  }, []);

  return (
    <div className="p-8 pb-20">
      <p className="text-[18px] font-suite-bold text-text-default mb-6">Templates</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {invitations?.map((item: TemplatesData) => (
          <InvitationItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
