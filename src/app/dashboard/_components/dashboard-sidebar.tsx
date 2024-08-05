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
import React from 'react';

import { auth } from '@/config/auth';

import { DashboardSidebarItem } from './dashboard-sidebar-item';

export const DashboardSidebar = async () => {
  const session = await auth();

  return (
    <nav className="sticky flex w-full flex-col gap-1 bg-light-body dark:bg-dark-body">
      {menus.map((menu) =>
        !menu.roles ||
        menu.roles.some((role) => role === session?.user.type) ? (
          <DashboardSidebarItem key={menu.href} menu={menu} />
        ) : null,
      )}
    </nav>
  );
};

const menus = [
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <IconChalkboard size={16} />,
    label: 'Classes',
    href: '/dashboard/classes',
    roles: [$Enums.Role.ADMIN],
  },
  {
    icon: <IconHomeDot size={16} />,
    label: 'Dormitories',
    href: '/dashboard/dormitories',
    roles: [$Enums.Role.ADMIN],
  },
  {
    icon: <IconSchool size={16} />,
    label: 'Students',
    href: '/dashboard/students',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconFlag size={16} />,
    label: 'Violations',
    href: '/dashboard/violations',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconTrophy size={16} />,
    label: 'Rewards',
    href: '/dashboard/rewards',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconChecklist size={16} />,
    label: 'Permits',
    href: '/dashboard/permits',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconUsers size={16} />,
    label: 'Accounts',
    href: '/dashboard/accounts',
    roles: [$Enums.Role.ADMIN],
  },
  {
    icon: <IconArchive size={16} />,
    label: 'Records',
    href: '/dashboard/records',
    roles: [$Enums.Role.ADMIN],
  },
];
