import type React from 'react';

import { CopyrightBar } from '@/components/copyright-bar';

const AuthenticationLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <CopyrightBar />
    </div>
  );
};

export default AuthenticationLayout;
