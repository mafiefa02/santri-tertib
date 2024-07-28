'use client';

import { Select } from '@mantine/core';
import { $Enums } from '@prisma/client';
import React from 'react';

import { useQueryString } from '@/hooks/use-query-string';

const data = [
  { value: $Enums.Role.ADMIN, label: 'Admin' },
  { value: $Enums.Role.STAFF, label: 'Staff' },
];

export const AccountTypeFilter = () => {
  const { updateQuery } = useQueryString();

  return (
    <Select
      className="w-full md:max-w-52"
      data={data}
      placeholder="Select account type"
      onChange={(value) => updateQuery({ name: 'type', value })}
    />
  );
};
