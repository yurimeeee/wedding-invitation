import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { EmotionRegistry } from '@lib/EmotionRegistry';
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
      <body
        // className={suitFont.variable}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <body className={`${geistSans.variable} ${geistMono.variable} ${suitFont.variable} antialiased`}> */}
        <EmotionRegistry>
          <ThemeProviders>
            {children} <Toaster />
          </ThemeProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}
