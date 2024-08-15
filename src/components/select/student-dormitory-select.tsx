'use client';

import { Select, type SelectProps } from '@mantine/core';

import { useFindManyDormitories } from '@/hooks/use-find-many-dormitories';

export const StudentDormitorySelect = (props: SelectProps) => {
  const { data: dormitories } = useFindManyDormitories();

  const data = dormitories
    ? dormitories.map((dormitory) => ({
        value: dormitory.id.toString(),
        label: dormitory.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
