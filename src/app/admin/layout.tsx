'use client';

import React, { useState } from 'react';

import Auth from '@components/admin/layout/Auth';
import Header from '@components/admin/layout/Header';
import Menu from '@components/admin/layout/Menu';
import Sidebar from '@components/admin/layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <section>
      <Sidebar />
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      {isMenuOpen && <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={() => setIsMenuOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-full shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
      <Auth>
        <div className="sm:ml-[96px]">{children}</div>
      </Auth>
    </section>
  );
}
