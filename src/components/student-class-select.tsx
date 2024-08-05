'use client';

import { Select, type SelectProps } from '@mantine/core';

import { useFindManyClasses } from '@/hooks/use-find-many-classes';

export const StudentClassSelect = (props: SelectProps) => {
  const { data: classes } = useFindManyClasses();

  const data = classes
    ? classes.map((studentClass) => ({
        value: studentClass.id.toString(),
        label: studentClass.name,
      }))
    : [];

  return <Select data={data} {...props} />;
};
