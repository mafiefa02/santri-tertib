import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
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
    <html lang="id">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={cn('scroll-smooth antialiased', primary.className)}>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <QueryProvider>
            {children}
            <Toaster
              closeButton
              richColors
              position="top-center"
              theme="system"
            />
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
