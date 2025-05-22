import Auth from '@components/admin/layout/Auth';
import Header from '@components/admin/layout/Header';
import React from 'react';
import Sidebar from '@components/admin/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Sidebar />
      <Header />

      <Auth>{children}</Auth>
    </section>
  );
}
