'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { GRAY_400, GRAY_50, GRAY_500, GRAY_600, MINT_100 } from '@styles/colors';

import { FaRegUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import styled from '@emotion/styled';
import { useUserStore } from '@stores/useUserStore';

const HeaderComp = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 130px;
  width: calc(100vw - 130px);
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
            <DropdownMenuItem>
              로그아웃 <FiLogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </HeaderComp>
    </>
  );
};

export default Header;
