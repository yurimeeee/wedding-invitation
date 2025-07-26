import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import EditorLayout from './editor/layout';
import { EmotionRegistry } from '@lib/EmotionRegistry';
import Footer from '@components/editor/layout/Footer';
import Header from '@components/editor/layout/Header';
import type { Metadata } from 'next';
import ThemeProviders from '@lib/ThemeProviders';
import { Toaster } from '@components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wedding-invi',
  description: '직접 만드는 모바일 청첩장',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <EmotionRegistry>
          <ThemeProviders>
            <Header />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <Footer />
          </ThemeProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}
