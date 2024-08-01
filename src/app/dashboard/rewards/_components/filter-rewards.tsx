'use client';

import { Select, Skeleton } from '@mantine/core';
import React from 'react';

import { useQueryString } from '@/hooks/use-query-string';

import { useFindManyRewardCategories } from '../_hooks/use-find-many-reward-categories';

export const FilterRewards = ({ category }: { category?: string }) => {
  const { data: categories, isFetched } = useFindManyRewardCategories();
  const { updateQuery } = useQueryString();

  if (!isFetched) return <Skeleton className="h-9 w-full md:w-56" />;

  const data = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return (
    <Select
      className="w-full md:max-w-56"
      data={data}
      defaultValue={category}
      placeholder="Select category"
      onChange={(value) => updateQuery({ name: 'category', value })}
    />
  );
};
