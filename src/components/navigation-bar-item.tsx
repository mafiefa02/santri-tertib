'use client';

import { Button } from '@mantine/core';
import type { $Enums } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MenuItem {
  href: string;
  icon: React.ReactNode | JSX.Element;
  label: string;
  roles?: $Enums.Role[];
}

export const NavigationBarItem = ({ menu }: { menu: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(menu.href);

  if (isActive)
    return (
      <Button
        key={menu.href}
        className="shrink-0"
        component={Link}
        href={menu.href}
        justify="center"
        leftSection={menu.icon}
        size="xs"
        variant="light"
      >
        {menu.label}
      </Button>
    );

  return (
    <>
      <Button
        key={`${menu.href}mobile`}
        className="shrink-0"
        classNames={{ root: 'mtn-sm:hidden' }}
        component={Link}
        href={menu.href}
        justify="center"
        size="compact-sm"
        variant="subtle"
      >
        {menu.icon}
      </Button>
      <Button
        key={`${menu.href}desktop`}
        className="shrink-0"
        classNames={{ root: 'hidden mtn-sm:block' }}
        component={Link}
        href={menu.href}
        justify="center"
        leftSection={menu.icon}
        size="xs"
        variant="subtle"
      >
        {menu.label}
      </Button>
    </>
  );
};
