'use client';

import { auth, db } from '@lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import InvitationItem from '@components/editor/feature/InvitationItem';
import { TemplatesData } from '@type/templates';

// import { useUserStore } from '@stores/useUserStore';

export default function DashbordPage() {
  const [invitations, setInvitations] = useState<TemplatesData[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // 로그인 정보가 없으면 종료

    const fetchInvitations = async () => {
      try {
        const colRef = collection(db, 'users', user.uid, 'invitations');
        const querySnapshot = await getDocs(colRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvitations(data as TemplatesData[]);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p className="text-[18px] font-suite-bold text-text-default mb-6">Templates</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {invitations?.map((item: TemplatesData, index: number) => (
          <InvitationItem key={index} data={item} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
