'use client';

import Auth from '@components/editor/layout/Auth';
import React from 'react';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Auth>
        <div>{children}</div>
      </Auth>
    </section>
  );
}
