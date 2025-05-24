'use client';

import Auth from '@components/admin/layout/Auth';
import Header from '@components/admin/layout/Header';
import React from 'react';
import Sidebar from '@components/admin/layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <section>
      <Sidebar />
      <Header />

      <Auth>
        <div className="sm:ml-[96px]">{children}</div>
      </Auth>
    </section>
  );
}
