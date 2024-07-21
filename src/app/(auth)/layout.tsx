import type React from 'react';

import { CopyrightBar } from '@/components/copyright-bar';
import { NavigationBar } from '@/components/navigation-bar';

const AuthenticationLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <NavigationBar />
      {children}
      <CopyrightBar />
    </div>
  );
};

export default AuthenticationLayout;
