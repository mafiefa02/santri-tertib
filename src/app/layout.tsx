import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import Head from 'next/head';
import { Toaster } from 'sonner';

import { primary } from '@/config/font';
import { rootMetadata } from '@/config/metadata';
import { QueryProvider } from '@/providers/query-provider';
import { theme } from '@/styles/theme';
import { cn } from '@/utils';

export const metadata: Metadata = rootMetadata;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html data-mantine-color-scheme="light" lang="id">
      <Head>
        <ColorSchemeScript defaultColorScheme="light" />
      </Head>
      <body className={cn('scroll-smooth antialiased', primary.className)}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <QueryProvider>
            {children}
            <Toaster closeButton richColors position="top-center" />
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
