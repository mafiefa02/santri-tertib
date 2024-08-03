'use client';

import { useQuery } from '@tanstack/react-query';

import { findManyRewardCategories } from '@/queries/find-many-reward-categories';

export const useFindManyRewardCategories = () => {
  return useQuery({
    queryKey: ['reward-categories'],
    queryFn: () => findManyRewardCategories(),
  });
};
