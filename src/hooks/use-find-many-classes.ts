'use client';

import { useQuery } from '@tanstack/react-query';

import { findManyClasses } from '@/queries/find-many-classes';

export const useFindManyClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => findManyClasses(),
  });
};
