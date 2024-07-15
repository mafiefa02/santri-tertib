import '@/styles/globals.css';
import type { Metadata } from 'next';

import { rubik } from '@/config/font';
import { rootMetadata } from '@/config/metadata';
import { cn } from '@/utils/cn';

export const metadata: Metadata = rootMetadata;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="id">
      <body className={cn('antialiased', rubik.className)}>{children}</body>
    </html>
  );
};

export default RootLayout;
