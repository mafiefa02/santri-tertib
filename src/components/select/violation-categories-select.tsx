'use client';

import { Select, type SelectProps } from '@mantine/core';

import { useFindManyViolationCategories } from '@/hooks/use-find-many-violation-categories';

export const ViolationCategoriesSelect = (props: SelectProps) => {
  const { data: categories } = useFindManyViolationCategories();

  const data = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
