'use client';

import { Anchor, Breadcrumbs, Title } from '@mantine/core';
import { usePathname } from 'next/navigation';
import React from 'react';

import { formatToTitle } from '@/utils';

export const DashboardHeader = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((val) => val);
  const pageTitle = paths.length > 1 ? paths[1] : 'Dashboard';
  const items = paths.slice(0, 3).map((path) => ({
    title: formatToTitle(path),
    href: `/${path}`,
  }));

  const crumbs = [{ title: 'Home', href: '/' }, ...items].map((item) => (
    <Anchor key={item.href + item.href} className="text-xs" href={item.href}>
      {item.title}
    </Anchor>
  ));

  return (
    <header className="sticky top-0 flex w-full items-center justify-between gap-8 bg-light-body dark:bg-dark-body">
      <Title
        className="text-mtn-primary-filled"
        classNames={{ root: 'text-xl md:text-2xl' }}
        order={2}
      >
        {formatToTitle(pageTitle)}
      </Title>
      <Breadcrumbs>{crumbs}</Breadcrumbs>
    </header>
  );
};
