'use client';

import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import { auth } from '@lib/firebase';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

export default function AdminLoginPage() {
  const { user } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user as User;
      const token = await user.getIdToken();
      // Zustand에 유저 정보 저장
      useUserStore.getState().login(user);
      // 토큰을 쿠키에 저장하기 위해 API 호출
      await fetch('/api/admin/login/sessionLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      alert('로그인 되었습니다.');
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     router.push('/admin');
  //   }
  // }, [user]);
  return (
    <div className="flex items-center justify-items-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Image src="/assets/img/logo-my.svg" alt="logo" width={177} height={30} className="mb-5" />
        <Input type="text" placeholder="관리자 이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded mb-2" width="w-full" />
        <Input type="password" placeholder="관리자 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded mb-2" width="w-full" />
        <Button onClick={handleLogin} disabled={email.trim() === '' || password.trim() === ''} width="w-full">
          로그인
        </Button>
      </div>
    </div>
  );
}
