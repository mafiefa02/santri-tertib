import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuDropdown,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { $Enums } from '@prisma/client';
import {
  IconHistory,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { auth } from '@/config/auth';

import { NavigationBarItem } from './navigation-bar-item';
import { NavigationLogoutButton } from './navigation-logout-button';

const menus = [
  {
    icon: <IconHistory size={16} />,
    label: 'History',
    href: '/history',
  },
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Dashboard',
    href: '/dashboard',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
];

export const NavigationBar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-10 flex w-full border-b bg-light-body py-3 dark:bg-dark-body">
      <div className="container flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-2" href="/">
            <h1 className="font-bold text-primary-500">Santrib</h1>
          </Link>
          <Divider orientation="vertical" />
          <div className="flex items-center gap-1">
            {menus.map((menu) =>
              !menu.roles ||
              menu.roles.some((role) => role === session?.user.type) ? (
                <NavigationBarItem key={menu.href} menu={menu} />
              ) : null,
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <Menu>
              <MenuTarget>
                <Avatar
                  className="hover:cursor-pointer"
                  color="green"
                  src={session.user.avatar ?? undefined}
                />
              </MenuTarget>
              <MenuDropdown>
                <MenuLabel>Account</MenuLabel>
                <NavigationLogoutButton
                  leftSection={
                    <IconLogout className="text-primary-500" size={16} />
                  }
                >
                  Logout
                </NavigationLogoutButton>
              </MenuDropdown>
            </Menu>
          ) : (
            <Button
              className="shrink-0"
              component={Link}
              href="/login"
              justify="center"
              rightSection={<IconLogin size={16} />}
              size="xs"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
