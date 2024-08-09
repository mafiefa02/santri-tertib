import React from 'react';

import { auth } from '@/config/auth';
import { dashboardRoutes as routes } from '@/routes/dashboard-routes';

import { DashboardSidebarItem } from './dashboard-sidebar-item';

export const DashboardSidebar = async () => {
  const session = await auth();

  return (
    <nav className="sticky flex w-full flex-col gap-1 bg-light-body dark:bg-dark-body">
      {routes.map((route) =>
        route.roles.some((role) => role === session?.user.type) ? (
          <DashboardSidebarItem key={route.href} menu={route} />
        ) : null,
      )}
    </nav>
  );
};
