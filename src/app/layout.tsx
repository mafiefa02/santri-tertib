import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import { rubik } from '@/config/font';
import { rootMetadata } from '@/config/metadata';
import { theme } from '@/styles/theme';
import { cn } from '@/utils/cn';

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
      <body className={cn('antialiased', rubik.className)}>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
