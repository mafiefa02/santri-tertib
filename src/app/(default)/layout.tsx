import React from 'react';

import { NavigationBar } from '@/components/navigation-bar';

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <NavigationBar />
      {children}
    </div>
  );
};

export default DefaultLayout;
