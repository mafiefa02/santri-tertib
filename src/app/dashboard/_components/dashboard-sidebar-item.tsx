'use client';

import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
  const isDesktopLarge = useMediaQuery('(min-width: 75em)');

  return (
    <Button
      aria-label={`Navigate to ${menu.label}`}
      className="shrink-0 mtn-lg:min-w-52"
      component={Link}
      href={menu.href}
      justify={isDesktopLarge ? 'left' : 'center'}
      leftSection={isDesktopLarge ? menu.icon : undefined}
      size={isDesktopLarge ? 'sm' : 'compact-xl'}
      variant={isActive ? 'light' : 'subtle'}
    >
      {isDesktopLarge ? menu.label : menu.icon}
    </Button>
  );
};
