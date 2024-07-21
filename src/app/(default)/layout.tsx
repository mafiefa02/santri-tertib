import React from 'react';

import { NavigationBar } from '@/components/navigation-bar';

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      {children}
    </div>
  );
};

export default DefaultLayout;
