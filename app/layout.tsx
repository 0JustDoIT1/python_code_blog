import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DS Reference',
  description: '파이썬 데이터 사이언스 핵심 레퍼런스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
