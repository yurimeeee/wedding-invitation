'use client';

import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

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
    try {
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user as User;
      // const token = await user.getIdToken();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

      toast.success('회원가입 되었습니다.');
      router.push('/editor');
    } catch (error: any) {
      console.error(error);
      // More specific error handling for sign-up
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('이미 가입된 이메일입니다.');
          break;
        case 'auth/invalid-email':
          alert('이메일 주소 형식이 올바르지 않습니다.');
          break;
        case 'auth/operation-not-allowed':
          alert('이메일/비밀번호 로그인이 비활성화되어 있습니다. Firebase 설정을 확인해주세요.');
          break;
        case 'auth/weak-password':
          alert('비밀번호가 너무 취약합니다. 더 강력한 비밀번호를 사용해주세요.');
          break;
        default:
          alert('회원가입 중 오류가 발생했습니다: ' + error.message);
      }
    }
  };
  // const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // const googleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     // 로그인 성공
  //     // const signedInUser = result.user;
  //     // setUser(signedInUser);

  //     // Zustand에 유저 정보 저장
  //     useUserStore.getState().login(result.user);
  //     // setError(null);

  //     // Google Access Token 가져오기 (필요한 경우)
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     console.log('Google Access Token:', token);
  //     router.push('/editor');
  //     // 추가 사용자 정보 가져오기 (필요한 경우)
  //     // const additionalUserInfo = getAdditionalUserInfo(result);
  //     // console.log("Additional User Info:", additionalUserInfo);
  //   } catch (error: any) {
  //     // 오류 처리
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.customData?.email; // customData에서 email 가져오기
  //     const credential = GoogleAuthProvider.credentialFromError(error);

  //     console.error('Google Sign-In Error:', errorCode, errorMessage, email, credential);
  //     // setError(errorMessage);

  //     // account-exists-with-different-credential 오류 처리 예시 (웹 페이지 내용 참고)
  //     if (errorCode === 'auth/account-exists-with-different-credential') {
  //       // 다른 제공업체로 이미 계정이 존재하는 경우 처리 로직 추가
  //       // 웹 페이지의 "account-exists-with-different-credential 오류 처리" 섹션을 참고하세요.
  //       console.log('Account exists with different credential. Handle linking here.');
  //       // 예: 사용자에게 기존 계정으로 로그인하도록 안내하고 계정 연결 시도
  //     }
  //   }
  // };

  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const googleLogin = async () => {
    // ... (Your existing googleLogin function - no changes needed here)
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
      <div className="flex flex-col items-center justify-center min-w-[256px]">
        <Image src="/assets/img/logo-my.svg" alt="logo" width={177} height={30} className="mb-5" />
        <Input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" width="w-full" />
        {email && !isValidEmail(email) && <CustomInfoText text="이메일 형식이 올바르지 않습니다" color={'#EF665B'} className="mt-2" />}
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded my-2" width="w-full" />
        <Input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} className="p-2 border rounded" width="w-full" />
        {password !== passwordCheck && <CustomInfoText text="비밀번호가 일치하지 않습니다" color={'#EF665B'} className="mt-2" />}
        <Button onClick={handleSignUp} disabled={email.trim() === '' || password.trim() === ''} width="w-full" className="mt-4 mb-2">
          회원가입
        </Button>
        <Button onClick={googleLogin} width="w-full" rightIcon={<FaGoogle />}>
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
