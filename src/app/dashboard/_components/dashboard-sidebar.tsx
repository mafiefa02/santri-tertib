import React from 'react';

import { auth } from '@/config/auth';

import { DashboardSidebarMenu } from './dashboard-sidebard-menu';

export const DashboardSidebar = async () => {
  const session = await auth();
  return (
    <nav className="sticky flex w-full flex-col gap-1 bg-light-body dark:bg-dark-body">
      <DashboardSidebarMenu userRole={session?.user.type} />
    </nav>
  );
};
