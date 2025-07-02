'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

export default function Auth({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // zustand 상태 초기화 이후 체크
    setIsLoading(false);
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return null; // 또는 로딩 스피너

  return <>{children}</>;
}
