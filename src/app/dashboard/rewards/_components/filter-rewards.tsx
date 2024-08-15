'use client';

import React from 'react';

import { RewardCategoriesSelect } from '@/components/select/reward-categories-select';
import { useQueryString } from '@/hooks/use-query-string';

export const FilterRewards = ({ category }: { category?: string }) => {
  const { updateQuery } = useQueryString();

  return (
    <RewardCategoriesSelect
      className="w-full md:max-w-56"
      defaultValue={category}
      placeholder="Select category"
      onChange={(value) => updateQuery({ name: 'category', value })}
    />
  );
};
