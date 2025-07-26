import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[96px] p-2 flex-col border-r bg-background sm:flex">
      <Link href="/">
        <Image src="/assets/img/logo-sm.svg" alt="logo" width={100} height={50} />
      </Link>

      <nav>
        <ul className="flex flex-col justify-center items-center gap-5 px-2 sm:py-5 mt-5">
          <li>
            <Link href="/editor">제작</Link>
          </li>
          <li>
            <Link href="/editor/templates"> 디자인</Link>
          </li>
          {/* <li>
            <Link href="/editor/invitaions">제작 목록</Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
