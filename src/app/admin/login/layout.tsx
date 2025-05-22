// app/admin/dashboard/layout.tsx

import React from 'react';

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{children}</div>;
}
