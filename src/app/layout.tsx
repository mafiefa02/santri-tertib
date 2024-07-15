import '@/styles/globals.css';
import type { Metadata } from 'next';

import { rubik } from '@/config/font';
import { rootMetadata } from '@/config/metadata';
import { NextThemeProvider } from '@/providers/next-theme-provider';
import { NextUIProvider } from '@/providers/next-ui-provider';
import { cn } from '@/utils/cn';

export const metadata: Metadata = rootMetadata;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="id">
      <body className={cn('antialiased', rubik.className)}>
        <NextUIProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
};

export default RootLayout;
