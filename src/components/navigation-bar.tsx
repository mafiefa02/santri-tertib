import { Button } from '@mantine/core';
import { IconLogin } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export const NavigationBar = () => {
  const menus = [{ label: 'History', href: '/history' }];

  return (
    <header className="sticky top-0 flex w-full border-b py-3">
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
        </div>
      </div>
    </header>
  );
};
