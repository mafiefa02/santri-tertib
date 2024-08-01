'use client';

import { Select, type SelectProps, Skeleton } from '@mantine/core';

import { useFindManyRewardCategories } from '@/app/dashboard/rewards/_hooks/use-find-many-reward-categories';

export const RewardCategoriesSelect = (props: SelectProps) => {
  const { data: categories, isFetched } = useFindManyRewardCategories();
  if (!isFetched) return <Skeleton className="h-9 w-full md:w-56" />;

  const data = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
