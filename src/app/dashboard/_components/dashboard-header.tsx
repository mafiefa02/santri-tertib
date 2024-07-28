'use client';

import { Anchor, Breadcrumbs, Button, Title } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { formatToTitle } from '@/utils/format-to-title';

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between gap-8 bg-light-body dark:bg-dark-body">
      <DashboardPageTitle />
      <DashboardBreadcrumbs />
    </header>
  );
};

const DashboardBreadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((val) => val);
  const items = paths.slice(0, 3).map((path, index) => ({
    title: formatToTitle(path),
    href: `/${paths.slice(0, index + 1).join('/')}`,
  }));

  const crumbs = [
    {
      title: (
        <Button className="-mr-1" size="compact-xs" variant="subtle">
          <IconHome size={12} />
        </Button>
      ),
      href: '/',
    },
    ...items,
  ].map((item) => (
    <Anchor key={item.href + item.href} className="text-xs" href={item.href}>
      {item.title}
    </Anchor>
  ));

  return <Breadcrumbs className="hidden mtn-xs:flex">{crumbs}</Breadcrumbs>;
};

const DashboardPageTitle = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((val) => val);

  const pageTitle = paths.length > 1 ? paths[1] : 'Dashboard';

  return (
    <Title
      className="text-mtn-primary-filled dark:text-mtn-primary-light-color"
      classNames={{ root: 'text-lg sm:text-xl md:text-2xl' }}
      order={2}
    >
      {formatToTitle(pageTitle)}
    </Title>
  );
};
