'use client';

import { useQuery } from '@tanstack/react-query';

import { findManyDormitories } from '@/queries/find-many-dormitories';

export const useFindManyDormitories = () => {
  return useQuery({
    queryKey: ['dormitories'],
    queryFn: () => findManyDormitories(),
  });
};
