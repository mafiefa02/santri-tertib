import { Button, Divider } from '@mantine/core';
import { IconLogin } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { auth } from '@/config/auth';

import { NavigationMenu } from './navigation-menu';
import { SessionDropdown } from './session-dropdown';

export const NavigationBar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-10 flex w-full border-b bg-light-body py-3 dark:bg-dark-body">
      <div className="container flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-2" href="/">
            <span className="font-bold text-mtn-primary-filled dark:text-mtn-primary-light-color">
              Santrib
            </span>
          </Link>
          <Divider orientation="vertical" />
          <div className="flex items-center gap-1">
            <NavigationMenu userRole={session?.user.type} />
          </div>
        </div>

        {session ? (
          <SessionDropdown
            avatar={session.user.avatar}
            type={session.user.type}
            username={session.user.username}
          />
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
    </header>
  );
};
