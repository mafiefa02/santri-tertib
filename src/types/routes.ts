import type { $Enums } from '@prisma/client';

/** An interface for typing route definition in navigation header or sidebar */
export interface Route {
  icon: JSX.Element;
  label: string;
  href: string;
  show: boolean;
}

/** Roles is undefined if everyone is allowed to access the corresponding route */
export interface RootRoutes extends Route {
  roles?: $Enums.Role[];
}

/** Student shouldn't be able to access dashboard routes */
export interface DashboardRoutes extends Route {
  roles: Exclude<$Enums.Role, 'STUDENT'>[];
}
