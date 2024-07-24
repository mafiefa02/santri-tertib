import React from 'react';

import { DashboardHeader } from '../_components/dashboard-header';

const RewardsDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative grid grid-rows-[auto_1fr] gap-5 overflow-y-auto">
      <DashboardHeader />
      <div className="no-scrollbar overflow-y-auto">{children}</div>
    </div>
  );
};

export default RewardsDashboardLayout;
