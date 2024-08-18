import type { $Enums } from '@prisma/client';

import { dashboardRoutes as routes } from '@/routes/dashboard-routes';
import type { DashboardRoutes } from '@/types/routes';

import { DashboardSidebarItem } from './dashboard-sidebar-item';

export const DashboardSidebarMenu = ({
  userRole,
}: {
  userRole?: $Enums.Role;
}) => {
  const hasUserRole = (route: DashboardRoutes) =>
    route.roles.some((role) => role === userRole);

  return routes.map((route) =>
    hasUserRole(route) && route.show ? (
      <DashboardSidebarItem key={route.href} menu={route} />
    ) : null,
  );
};
