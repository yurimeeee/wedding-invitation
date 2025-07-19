'use client';

import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@stores/useUserStore";

export const userLogout = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/login');
      useUserStore.getState().logout();

    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  }

  return logout;
}