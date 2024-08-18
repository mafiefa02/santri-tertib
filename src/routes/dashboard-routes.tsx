import { $Enums } from '@prisma/client';
import {
  IconArchive,
  IconChalkboard,
  IconChecklist,
  IconFlag,
  IconHomeDot,
  IconLayoutDashboard,
  IconSchool,
  IconTrophy,
  IconUsers,
} from '@tabler/icons-react';

import type { DashboardRoutes } from '@/types/routes';

export const dashboardRoutes: DashboardRoutes[] = [
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Dashboard',
    href: '/dashboard',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconChalkboard size={16} />,
    label: 'Classes',
    href: '/dashboard/classes',
    roles: [$Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconHomeDot size={16} />,
    label: 'Dormitories',
    href: '/dashboard/dormitories',
    roles: [$Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconSchool size={16} />,
    label: 'Students',
    href: '/dashboard/students',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconFlag size={16} />,
    label: 'Violations',
    href: '/dashboard/violations',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconTrophy size={16} />,
    label: 'Rewards',
    href: '/dashboard/rewards',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconChecklist size={16} />,
    label: 'Permits',
    href: '/dashboard/permits',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconUsers size={16} />,
    label: 'Accounts',
    href: '/dashboard/accounts',
    roles: [$Enums.Role.ADMIN],
    show: true,
  },
  {
    icon: <IconArchive size={16} />,
    label: 'Records',
    href: '/dashboard/records',
    roles: [$Enums.Role.ADMIN],
    show: true,
  },
];

/** Get the available dashboard routes for the current session */
export const getRoleDashboardRoutes = (role: Exclude<$Enums.Role, 'STUDENT'>) =>
  dashboardRoutes.filter((route) => route.roles.includes(role));
