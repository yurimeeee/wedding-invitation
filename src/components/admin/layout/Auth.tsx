'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

export default function Auth({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login'); // 로그인 안 되어 있으면 로그인 페이지로
    }
  }, [user, router]);

  return <>{children}</>;
}
