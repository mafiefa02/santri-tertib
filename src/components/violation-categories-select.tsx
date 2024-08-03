'use client';

import { Select, type SelectProps, Skeleton } from '@mantine/core';

import { useFindManyViolationCategories } from '@/hooks/use-find-many-violation-categories';

export const ViolationCategoriesSelect = (props: SelectProps) => {
  const { data: categories, isFetched } = useFindManyViolationCategories();
  if (!isFetched) return <Skeleton className="h-9 w-full md:w-56" />;

  const data = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
