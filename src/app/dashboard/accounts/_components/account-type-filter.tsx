'use client';

import { Select } from '@mantine/core';
import { type $Enums } from '@prisma/client';
import React from 'react';

import { useQueryString } from '@/hooks/use-query-string';
import { getAccountTypeSelectOptions } from '@/utils/get-account-type-select-options';

const data = getAccountTypeSelectOptions();

export const AccountTypeFilter = ({ type }: { type?: $Enums.Role }) => {
  const { updateQuery } = useQueryString();

  return (
    <Select
      className="w-full md:max-w-52"
      data={data}
      defaultValue={type}
      placeholder="Select account type"
      onChange={(value) => updateQuery({ name: 'type', value })}
    />
  );
};
