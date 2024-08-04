'use client';

import { type $Enums } from '@prisma/client';
import React from 'react';

import { AccountTypeSelect } from '@/components/account-type-select';
import { useQueryString } from '@/hooks/use-query-string';

export const AccountTypeFilter = ({ type }: { type?: $Enums.Role }) => {
  const { updateQuery } = useQueryString();

  return (
    <AccountTypeSelect
      searchable
      className="w-full md:max-w-52"
      defaultValue={type}
      placeholder="Select account type"
      onChange={(value) => updateQuery({ name: 'type', value })}
    />
  );
};
