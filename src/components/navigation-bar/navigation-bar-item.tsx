'use client';

import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { $Enums } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/utils/cn';

interface MenuItem {
  href: string;
  icon: React.ReactNode | JSX.Element;
  label: string;
  roles?: $Enums.Role[];
}

export const NavigationBarItem = ({ menu }: { menu: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(menu.href);
  const matches = useMediaQuery('(min-width: 36em)'); // matches with mtn-xs
  const shouldRenderLabel = isActive || matches;

  return (
    <Button
      key={menu.href}
      aria-label={`Navigate to ${menu.label}`}
      component={Link}
      href={menu.href}
      justify="center"
      leftSection={shouldRenderLabel ? menu.icon : undefined}
      size={shouldRenderLabel ? 'xs' : 'compact-sm'}
      variant={isActive ? 'light' : 'subtle'}
      className={cn(
        'shrink-0',
        !isActive && matches ? 'hidden mtn-xs:block' : null,
        !isActive && !matches ? 'mtn-xs:hidden' : null,
      )}
    >
      {shouldRenderLabel ? menu.label : menu.icon}
    </Button>
  );
};
