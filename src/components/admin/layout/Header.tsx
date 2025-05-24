'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { GRAY_400, GRAY_50, GRAY_500, GRAY_600, MINT_100 } from '@styles/colors';

import { FaRegUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import { auth } from '@lib/firebase';
import { signOut } from 'firebase/auth';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

const HeaderComp = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 96px;
  width: calc(100vw - 96px);
  z-index: 5;
  background-color: #ffffff;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
`;
const IconButton = styled(DropdownMenuTrigger)`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${GRAY_400};
  border-radius: 50%;
  transition: all.3s;

  :hover {
    background: ${GRAY_50};
  }
`;

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const logout = () => {
    // signOut 함수를 호출하여 로그아웃합니다.
    signOut(auth)
      .then(() => {
        // 로그아웃 성공!
        console.log('사용자가 성공적으로 로그아웃되었습니다.');
        router.push('/admin/login');
        useUserStore.getState().logout();
      })
      .catch((error) => {
        // 로그아웃 중 오류가 발생했습니다.
        console.error('로그아웃 중 오류 발생:', error);
        // 오류 처리를 여기에 작성하세요.
      });
  };

  return (
    <>
      <HeaderComp>
        <DropdownMenu>
          <IconButton>
            <FaRegUser color={GRAY_600} size={18} />
          </IconButton>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>마이페이지</DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem> */}
            <DropdownMenuItem onClick={logout}>
              로그아웃 <FiLogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </HeaderComp>
    </>
  );
};

export default Header;
