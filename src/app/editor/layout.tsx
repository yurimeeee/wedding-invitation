'use client';

import React, { useEffect, useState } from 'react';

import Auth from '@components/editor/layout/Auth';
import Header from '@components/editor/layout/Header';
import Menu from '@components/editor/layout/Menu';
import Sidebar from '@components/editor/layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoginPage = pathname === '/editor/login';
  const [mounted, setMounted] = useState(false);
  if (isLoginPage) {
    return <>{children}</>;
  }
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section>
      <Sidebar />
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      {mounted && isMenuOpen && <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={() => setIsMenuOpen(false)} />}
      {mounted && (
        <div className={`fixed inset-y-0 left-0 z-50 w-full shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
      <Auth>
        <div className="sm:ml-[96px]">{children}</div>
      </Auth>
    </section>
  );
}
