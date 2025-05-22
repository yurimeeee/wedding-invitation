'use client';

import { User, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@lib/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserStore } from '@stores/useUserStore';

export default function AdminLoginPage() {
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
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      AdminLoginPage
      <div className="flex flex-col items-center justify-center h-screen">
        <input type="text" placeholder="관리자 비밀번호" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded mb-2" />
        <input type="password" placeholder="관리자 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded mb-2" />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          로그인
        </button>
      </div>
    </div>
  );
}
