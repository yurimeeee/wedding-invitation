'use client';

import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { Button } from '@components/ui/button';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import Link from 'next/link';
import { auth } from '@lib/firebase';
import { isValidEmail } from '@utils/func';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserStore } from '@stores/useUserStore';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (password !== passwordCheck) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user as User;
      const token = await user.getIdToken();

      useUserStore.getState().login(user);
      const res = await fetch('/api/admin/login/sessionLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
      toast.success('회원가입 되었습니다.');
      router.push('/editor');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('이미 가입된 이메일입니다.');
          break;
        case 'auth/invalid-email':
          toast.error('이메일 주소 형식이 올바르지 않습니다.');
          break;
        case 'auth/operation-not-allowed':
          toast.error('이메일/비밀번호 로그인이 비활성화되어 있습니다.');
          break;
        case 'auth/weak-password':
          toast.error('비밀번호가 너무 취약합니다. 더 강력한 비밀번호를 사용해주세요.');
          break;
        default:
          toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const googleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      useUserStore.getState().login(result.user);
      router.push('/editor');
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        toast.error('이미 다른 방식으로 가입된 이메일입니다.');
      } else {
        toast.error('구글 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center min-w-[256px]">
        <Image src="/assets/img/logo-my.svg" alt="logo" width={177} height={30} className="mb-5" />
        <Input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" width="w-full" />
        {email && !isValidEmail(email) && <CustomInfoText text="이메일 형식이 올바르지 않습니다" color={'#EF665B'} className="mt-2" />}
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded my-2" width="w-full" />
        <Input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} className="p-2 border rounded" width="w-full" />
        {password !== passwordCheck && <CustomInfoText text="비밀번호가 일치하지 않습니다" color={'#EF665B'} className="mt-2" />}
        <Button onClick={handleSignUp} disabled={isLoading || email.trim() === '' || password.trim() === ''} width="w-full" className="mt-4 mb-2">
          회원가입
        </Button>
        <Button onClick={googleLogin} disabled={isLoading} width="w-full" rightIcon={<FaGoogle />}>
          구글 로그인
        </Button>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-600 mr-3">이미 회원이신가요?</span>
          <Link href="/login" className="text-sm text-pink-600 underline">
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
