'use client';

import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import { CustomCheckbox } from '@components/ui/checkbox';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import Link from 'next/link';
import { auth } from '@lib/firebase';
import { isValidEmail } from '@utils/func';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSavedEmail, setIsSavedEmail] = useState(false);

  useEffect(() => {
    const savedEmailFromLS = localStorage.getItem('email');
    if (savedEmailFromLS) {
      setEmail(savedEmailFromLS);
      setIsSavedEmail(true);
    }
  }, []);

  // 이메일 저장
  const saveEmail = (email: string) => {
    localStorage.setItem('email', email);
  };

  // 로그인
  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }

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
      if (isSavedEmail) {
        saveEmail(email);
      } else {
        localStorage.removeItem('email');
      }
      // alert('로그인 되었습니다.');
      router.push('/editor');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('이메일 형식이 올바르지 않습니다.');
          break;
        case 'auth/user-disabled':
          toast.error('이 계정은 비활성화되었습니다.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
          break;
        case 'auth/too-many-requests':
          toast.error('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
          break;
        default:
          toast.error('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex items-center justify-items-center h-full min-h-[100vh]">
      <div className="flex flex-col items-center justify-center min-w-[256px]">
        <Image src="/assets/img/logo-my.svg" alt="logo" width={177} height={30} className="mb-5" />
        <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded mb-2 w-full" width="w-full" />
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded mb-2 w-full" width="w-full" />
        <div className="flex items-center justify-start mb-4 w-full">
          <CustomCheckbox
            text="이메일 저장"
            value={isSavedEmail}
            onChange={() => {
              setIsSavedEmail(!isSavedEmail);
            }}
          />
        </div>
        <Button onClick={handleLogin} disabled={email.trim() === '' || password.trim() === ''} width="w-full">
          로그인
        </Button>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-600 mr-3">아직 회원이 아니신가요?</span>
          <Link href="/sign-up" className="text-sm text-pink-600 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
