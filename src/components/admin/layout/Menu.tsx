import { GRAY_400, GRAY_600 } from '@styles/colors';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import React from 'react';
import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import styled from '@emotion/styled';

interface MenuProps {
  onClose?: () => void;
  isOpen?: boolean;
}
const IconButton = styled.div`
  min-width: 42px;
  min-height: 42px;
  max-width: 42px;
  max-height: 42px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${GRAY_400};
  border-radius: 50%;
  transition: all.3s;
  margin: 0 auto;
  cursor: pointer;
`;
export default function Menu({ onClose, isOpen = false }: MenuProps) {
  if (!isOpen && typeof window !== 'undefined' && window.innerWidth < 640) return null;

  return (
    <>
      {/* 오버레이 */}
      {/* {onClose && <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={onClose} />} */}

      {/* 메뉴 패널 */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 h-full w-[90%] bg-white border-r p-4 transition-transform duration-300 sm:static sm:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-center">
          <Link href="/admin" className="">
            <Image src="/assets/img/logo-my.svg" alt="logo" width={240} height={50} />
          </Link>
        </div>

        <div className="flex flex-col h-full justify-between">
          <nav className="flex-1 flex items-center justify-center">
            <ul className="text-[24px] text-gray-500 text-center font-suite-bold flex flex-col items-center gap-8">
              <li>
                <Link href="/admin" onClick={onClose}>
                  대시보드
                </Link>
              </li>
              <li>
                <Link href="/admin/templates" onClick={onClose}>
                  청첩장 제작
                </Link>
              </li>
              <li>
                <Link href="/admin/invitaions" onClick={onClose}>
                  제작 목록
                </Link>
              </li>
            </ul>
          </nav>

          {/* <IconButton className="mb-12"> */}
          {/* <IoClose onClick={onClose} color={GRAY_600} size={30} className="mx-auto mb-12" /> */}
          <TfiClose onClick={onClose} color={GRAY_600} size={30} className="mx-auto mb-12" />
          {/* </IconButton> */}
        </div>
      </aside>
    </>
  );
}
