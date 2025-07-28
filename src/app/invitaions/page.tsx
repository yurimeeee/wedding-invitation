'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import InvitationItem from '@components/editor/feature/InvitationItem';
import { TemplatesData } from '@type/templates';
import { db } from '@lib/firebase';

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
      console.error('Error fetching templates:', error);
    }
  };
  useEffect(() => {
    fetchInvitationsList();
  }, []);

  return (
    <div className="p-8 pb-20">
      <p className="text-[18px] font-suite-bold text-text-default mb-6">Templates</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {invitations?.map((item: TemplatesData, index: number) => (
          <InvitationItem key={index} data={item} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
