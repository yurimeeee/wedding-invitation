'use client';

import { GoogleAuthProvider, User, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { Button } from '@components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import { auth } from '@lib/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserStore } from '@stores/useUserStore';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSignUp = async () => {
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
      router.push('/editor');
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // 로그인 성공
      // const signedInUser = result.user;
      // setUser(signedInUser);

      // Zustand에 유저 정보 저장
      useUserStore.getState().login(result.user);
      // setError(null);

      // Google Access Token 가져오기 (필요한 경우)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log('Google Access Token:', token);
      router.push('/editor');
      // 추가 사용자 정보 가져오기 (필요한 경우)
      // const additionalUserInfo = getAdditionalUserInfo(result);
      // console.log("Additional User Info:", additionalUserInfo);
    } catch (error: any) {
      // 오류 처리
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email; // customData에서 email 가져오기
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error('Google Sign-In Error:', errorCode, errorMessage, email, credential);
      // setError(errorMessage);

      // account-exists-with-different-credential 오류 처리 예시 (웹 페이지 내용 참고)
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // 다른 제공업체로 이미 계정이 존재하는 경우 처리 로직 추가
        // 웹 페이지의 "account-exists-with-different-credential 오류 처리" 섹션을 참고하세요.
        console.log('Account exists with different credential. Handle linking here.');
        // 예: 사용자에게 기존 계정으로 로그인하도록 안내하고 계정 연결 시도
      }
    }
  };
  return (
    <div className="flex items-center justify-items-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Image src="/assets/img/logo-my.svg" alt="logo" width={177} height={30} className="mb-5" />
        <Input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded mb-2" width="w-full" />
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded mb-2" width="w-full" />
        <Input type="password" placeholder="비밀번호 확인" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded mb-2" width="w-full" />
        <Button onClick={handleSignUp} disabled={email.trim() === '' || password.trim() === ''} width="w-full" className="mb-2">
          회원가입
        </Button>
        <Button onClick={googleLogin} width="w-full" rightIcon={<FaGoogle />}>
          구글 로그인
        </Button>
      </div>
    </div>
  );
}
