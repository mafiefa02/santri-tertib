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

export const DashboardSidebarItem = ({ menu }: { menu: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname.endsWith(menu.href);
  return (
    <>
      <Button
        key={`${menu.href}mobile-dashboard-sidebar`}
        className="shrink-0 mtn-lg:hidden"
        component={Link}
        href={menu.href}
        justify="center"
        size="compact-xl"
        variant={isActive ? 'light' : 'subtle'}
      >
        {menu.icon}
      </Button>
      <Button
        key={`${menu.href}desktop-dashboard-sidebar`}
        className="hidden min-w-52 shrink-0 mtn-lg:block"
        component={Link}
        href={menu.href}
        justify="left"
        leftSection={menu.icon}
        size="sm"
        variant={isActive ? 'light' : 'subtle'}
      >
        {menu.label}
      </Button>
    </>
  );
};
