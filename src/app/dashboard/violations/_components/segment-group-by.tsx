'use client';

import { SegmentedControl } from '@mantine/core';

import { useQueryString } from '@/hooks/use-query-string';

const data = [
  { label: 'Categories', value: 'categories' },
  { label: 'Violations', value: 'violations' },
];

export const SegmentGroupBy = ({
  group,
}: {
  group?: 'violations' | 'categories';
}) => {
  const { updateQuery } = useQueryString();

  return (
    <SegmentedControl
      className="w-full md:max-w-fit"
      data={data}
      defaultValue={group}
      onChange={(value) => updateQuery({ name: 'group', value })}
    />
  );
};
