import {
  Avatar,
  Button,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { auth } from '@/config/auth';

export const NavigationBar = async () => {
  const session = await auth();
  const menus = [{ label: 'History', href: '/history' }];

  return (
    <header className="dark:bg-dark-body bg-light-body sticky top-0 z-10 flex w-full border-b py-3">
      <div className="container flex w-full items-center justify-between">
        <Link
          className="text-lg font-bold tracking-tight text-primary-600"
          href="/"
        >
          SANTRIB
        </Link>

        <div className="flex items-center gap-2">
          {menus.map((menu) => (
            <Button
              key={menu.href}
              className="shrink-0"
              component={Link}
              href={menu.href}
              justify="center"
              size="xs"
              variant="subtle"
            >
              {menu.label}
            </Button>
          ))}

          {session ? (
            <Menu>
              <MenuTarget>
                <Avatar
                  className="hover:cursor-pointer"
                  color="green"
                  size="sm"
                  src={session.user.avatar ?? undefined}
                />
              </MenuTarget>
              <MenuDropdown>
                <MenuLabel>Account</MenuLabel>
                <MenuItem
                  component={Link}
                  href="/logout"
                  leftSection={<IconLogout size={16} />}
                >
                  Logout
                </MenuItem>
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
