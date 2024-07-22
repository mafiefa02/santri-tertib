'use client';

import { Title } from '@mantine/core';
import { usePathname } from 'next/navigation';
import React from 'react';

import { formatToTitle } from '@/utils';

export const DashboardHeader = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((val) => val);
  const pageTitle = paths.length > 1 ? paths[1] : 'Dashboard';
  return (
    <header className="sticky top-0 flex w-full items-center justify-between gap-8 bg-light-body dark:bg-dark-body">
      <Title order={2}>{formatToTitle(pageTitle)}</Title>
    </header>
  );
};
