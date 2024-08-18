import type { $Enums } from '@prisma/client';

import { rootRoutes as routes } from '@/routes/root-routes';
import type { RootRoutes } from '@/types/routes';

import { NavigationBarItem } from './navigation-bar-item';

export const NavigationMenu = ({ userRole }: { userRole?: $Enums.Role }) => {
  const hasUserRole = (route: RootRoutes) =>
    !route.roles || route.roles.some((role) => role === userRole);

  return routes.map((route) =>
    hasUserRole(route) && route.show ? (
      <NavigationBarItem key={route.href} menu={route} />
    ) : null,
  );
};
