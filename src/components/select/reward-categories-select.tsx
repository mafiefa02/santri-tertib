'use client';

import { Select, type SelectProps } from '@mantine/core';

import { useFindManyRewardCategories } from '@/hooks/use-find-many-reward-categories';

export const RewardCategoriesSelect = (props: SelectProps) => {
  const { data: categories } = useFindManyRewardCategories();

  const data = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
