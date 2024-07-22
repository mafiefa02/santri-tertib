import { $Enums } from '@prisma/client';
import { IconLayoutDashboard, IconUser, IconUsers } from '@tabler/icons-react';
import React from 'react';

import { auth } from '@/config/auth';

import { DashboardSidebarItem } from './dashboard-sidebar-item';

const menus = [
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Home',
    href: '/dashboard',
  },
  {
    icon: <IconUsers size={16} />,
    label: 'Students',
    href: '/dashboard/students',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconUser size={16} />,
    label: 'Accounts',
    href: '/dashboard/accounts',
    roles: [$Enums.Role.ADMIN],
  },
];

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
