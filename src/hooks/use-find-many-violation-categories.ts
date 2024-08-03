'use client';

import { useQuery } from '@tanstack/react-query';

import { findManyViolationCategories } from '@/queries/find-many-violation-categories';

export const useFindManyViolationCategories = () => {
  return useQuery({
    queryKey: ['violation-categories'],
    queryFn: () => findManyViolationCategories(),
  });
};
