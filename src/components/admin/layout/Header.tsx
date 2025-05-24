'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { GRAY_400, GRAY_50, GRAY_600 } from '@styles/colors';
import React, { useEffect, useState } from 'react';

import { FaRegUser } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '@lib/firebase';
import { signOut } from 'firebase/auth';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@stores/useUserStore';

const HeaderComp = styled.header<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  z-index: 5;
  background-color: #ffffff;
  padding: ${({ isScrolled }) => (isScrolled ? '8px 20px' : '12px 24px')};
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 2px 6px rgba(101, 101, 101, 0.1);
  transition: all.3s;

  @media (min-width: 640px) {
    left: 96px;
    width: calc(100vw - 96px);
  }
`;
const IconButton = styled(DropdownMenuTrigger)<{ isScrolled: boolean }>`
  /* width: 42px;
  height: 42px; */
  width: ${({ isScrolled }) => (isScrolled ? '36px' : '42px')};
  height: ${({ isScrolled }) => (isScrolled ? '36px' : '42px')};
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    // 초기 상태 세팅
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <HeaderComp isScrolled={isScrolled}>
        <div className="sm:hidden flex w-full">
          <FiChevronLeft
            onClick={() => {
              router.back();
            }}
            color={theme.color.gray_500}
            size={32}
            className="cursor-poiner"
          />
        </div>
        <DropdownMenu>
          <IconButton isScrolled={isScrolled}>
            <FaRegUser color={GRAY_600} size={isScrolled ? 14 : 18} />
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
