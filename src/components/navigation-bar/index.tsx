import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { auth } from '@/config/auth';
import { rootRoutes as routes } from '@/routes/root-routes';
import { formatToTitle } from '@/utils/format-to-title';

import { NavigationBarItem } from './navigation-bar-item';
import { NavigationLogoutButton } from './navigation-logout-button';

export const NavigationBar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-10 flex w-full border-b bg-light-body py-3 dark:bg-dark-body">
      <div className="container flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-2" href="/">
            <h1 className="font-bold text-mtn-primary-filled dark:text-mtn-primary-light-color">
              Santrib
            </h1>
          </Link>
          <Divider orientation="vertical" />
          <div className="flex items-center gap-1">
            {routes.map((route) =>
              !route.roles ||
              route.roles.some((role) => role === session?.user.type) ? (
                <NavigationBarItem key={route.href} menu={route} />
              ) : null,
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <Menu>
              <MenuTarget>
                <Avatar
                  aria-label="Account action button"
                  className="hover:cursor-pointer"
                  color="blue"
                  name={session.user.username}
                  role="button"
                  src={session.user.avatar ?? undefined}
                />
              </MenuTarget>
              <MenuDropdown>
                <MenuLabel className="flex items-center gap-4 font-bold text-mtn-primary-filled dark:text-mtn-primary-light-color">
                  {session.user.username}
                  <span className="font-normal">
                    {formatToTitle(session.user.type)}
                  </span>
                </MenuLabel>
                <MenuDivider />
                <NavigationLogoutButton
                  leftSection={
                    <IconLogout
                      className="text-mtn-primary-filled dark:text-mtn-primary-light-color"
                      size={16}
                    />
                  }
                >
                  Logout
                </NavigationLogoutButton>
              </MenuDropdown>
            </Menu>
          ) : (
            <Button
              aria-label="Login button"
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
