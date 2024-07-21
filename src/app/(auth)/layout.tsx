import { Skeleton } from '@mantine/core';
import Image from 'next/image';
import type React from 'react';

import { AuthHeader } from './_components/auth-header';
import { CopyrightBar } from './_components/copyright-bar';

const AuthenticationLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="grid lg:grid-cols-2">
      <div className="relative">
        <Image
          priority
          alt="Vaksin pertama"
          className="absolute hidden object-cover contrast-125 saturate-50 lg:block"
          height="1280"
          loading="eager"
          src="/bg-auth.jpg"
          style={{ width: '100%', height: '100%' }}
          width="1280"
        />
        <Skeleton
          className="absolute top-0 -z-[1] rounded-none"
          height="100%"
        />
      </div>
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <AuthHeader />
        {children}
        <CopyrightBar />
      </div>
    </main>
  );
};

export default AuthenticationLayout;
