'use client';

import { Button } from '@components/ui/button';
import { useUserStore } from '@stores/useUserStore';

export default function AdminHomePage() {
  const { user } = useUserStore();
  console.log('user', user);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      AdminHome
      <Button text="ㅇㄹㅇㄹㅇㄴㄹ" variant="outline" />
    </div>
  );
}
