'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { GRAY_400, GRAY_50, GRAY_600 } from '@styles/colors';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { FaRegUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useUserStore } from '@stores/useUserStore';
import { userLogout } from '@hook/useLogout';

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
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(101, 101, 101, 0.1);
  transition: all.3s;

  /* @media (min-width: 640px) {
    left: 96px;
    width: calc(100vw - 96px);
  } */
`;
const IconButton = styled(DropdownMenuTrigger)`
  min-width: 42px;
  min-height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${GRAY_400};
  border-radius: 50%;
  transition: all.3s;
  cursor: pointer;

  :hover {
    background: ${GRAY_50};
  }
`;

const DynamicMenu = dynamic(() => import('./Menu'), {
  ssr: false,
  loading: () => null,
});

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const logout = userLogout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLoginPage = pathname === '/login';
  const isInvitationPage = pathname.includes('/invitaions/');

  useEffect(() => {
    setMounted(true);
  }, []);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 100);
  //   };
  //   window.addEventListener('scroll', handleScroll);

  //   // 초기 상태 세팅
  //   handleScroll();

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return isLoginPage || isInvitationPage ? null : (
    <>
      <HeaderComp isScrolled={isScrolled}>
        <div className="hidden sm:flex gap-20">
          <Link href="/">
            <Image src="/assets/img/logo-sm.svg" alt="logo" width={100} height={50} priority={true} />
          </Link>
          <nav>
            <ul className="flex justify-center items-center gap-12 px-2 sm:py-5 font-suite text-text-default">
              <li>
                <Link href="/editor">홈</Link>
              </li>
              <li>
                <Link href="/editor/templates"> 디자인</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="sm:hidden flex cursor-pointer">
          <HiOutlineMenuAlt2
            onClick={() => setIsMenuOpen(true)}
            color={theme.color.gray_500}
            size={28}
            className="sm:hidden text-2xl text-gray-600 focus:outline-none cursor-poiner"
          />
        </div>

        <DropdownMenu>
          <IconButton aria-label="사용자 메뉴">
            <FaRegUser color={GRAY_600} size={isScrolled ? 14 : 18} />
          </IconButton>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/mypage')}>마이페이지</DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem> */}
            <DropdownMenuItem onClick={logout}>
              로그아웃 <FiLogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </HeaderComp>
      {mounted && isMenuOpen && <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={() => setIsMenuOpen(false)} />}
      {mounted && (
        <div className={`fixed inset-y-0 left-0 z-50 w-full shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}>
          {/* <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
          <DynamicMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
