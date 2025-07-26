import { GRAY_600 } from '@styles/colors';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import { userLogout } from '@hook/useLogout';

interface MenuProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export default function Menu({ onClose, isOpen = false }: MenuProps) {
  const logout = userLogout();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-30 sm:hidden" onClick={onClose} />}

      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 h-full w-[90%] bg-white border-r p-4 transition-transform duration-500 ease-in-out', // Added ease-in-out
          'sm:static sm:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-center">
          <Link href="/" className="" onClick={onClose}>
            <Image src="/assets/img/logo-my.svg" alt="logo" width={240} height={50} />
          </Link>
        </div>

        <div className="flex flex-col h-full justify-between">
          <nav className="flex-1 flex items-center justify-center">
            <ul className="text-[24px] text-gray-500 text-center font-suite-bold flex flex-col items-center gap-8">
              <li>
                <Link href="/" onClick={onClose}>
                  홈
                </Link>
              </li>
              <li>
                <Link href="/editor" onClick={onClose}>
                  제작
                </Link>
              </li>
              <li>
                <Link href="/editor/templates" onClick={onClose}>
                  디자인
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col justify-center items-center gap-6">
            <TfiClose onClick={onClose} color={GRAY_600} size={30} className="mx-auto mb-12 cursor-pointer" />
          </div>
        </div>
      </aside>
    </>
  );
}
