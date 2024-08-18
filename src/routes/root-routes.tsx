import { $Enums } from '@prisma/client';
import {
  IconChecklist,
  IconHistory,
  IconLayoutDashboard,
  IconUser,
} from '@tabler/icons-react';

import type { RootRoutes } from '@/types/routes';

export const rootRoutes: RootRoutes[] = [
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Dashboard',
    href: '/dashboard',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconHistory size={16} />,
    label: 'History',
    href: '/history',
    show: true,
  },
  {
    icon: <IconChecklist size={16} />,
    label: 'Permits',
    href: '/permits',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN, $Enums.Role.STUDENT],
    show: true,
  },
  {
    icon: <IconUser size={16} />,
    label: 'Profile',
    href: '/profile',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN, $Enums.Role.STUDENT],
    show: false,
  },
];

/** Get every routes that is accessible for everyone without a session/role */
export const commonRootRoutes = rootRoutes.filter((route) => !route.roles);
/** Get the routes accessible for current session */
export const getRoleRootRoutes = (role: $Enums.Role) =>
  rootRoutes.filter((route) => !route.roles || route.roles.includes(role));
