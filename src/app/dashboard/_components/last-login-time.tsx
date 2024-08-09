'use client';

import { Skeleton } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import dayjs, { extend } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

extend(LocalizedFormat);

export const LastLoginTime = ({ loginTime }: { loginTime: Date }) => {
  const mounted = useMounted();
  if (!mounted) return <Skeleton className="h-5 w-full" />;
  return dayjs(loginTime).format('LL LTS');
};
