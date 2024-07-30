'use client';

import { Select, Skeleton } from '@mantine/core';
import React from 'react';

import { useQueryString } from '@/hooks/use-query-string';

import { useFindManyRewardCategories } from '../_hooks/use-find-many-reward-categories';

export const FilterRewards = ({ category }: { category?: string }) => {
  const { data: categories, isFetched } = useFindManyRewardCategories();
  const { updateQuery } = useQueryString();

  if (!isFetched) return <Skeleton className="h-9 w-full md:max-w-52" />;

  const data = categories
    ? [{ id: 0, name: 'Tanpa kategori' }, ...categories].map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return (
    <Select
      className="w-full md:max-w-fit"
      data={data}
      defaultValue={category}
      placeholder="Select category"
      onChange={(value) => updateQuery({ name: 'category', value })}
    />
  );
};
