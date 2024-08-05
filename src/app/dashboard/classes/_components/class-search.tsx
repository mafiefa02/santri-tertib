'use client';

import { TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

import { useQueryString } from '@/hooks/use-query-string';

export const ClassSearch = ({ search }: { search?: string }) => {
  const { updateQuery } = useQueryString();

  const handleSearch = useDebouncedCallback((value: string) => {
    updateQuery({ name: 'search', value });
  }, 200);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.currentTarget.value);
  };

  return (
    <TextInput
      className="w-full md:max-w-80"
      defaultValue={search}
      leftSection={<IconSearch size={16} />}
      placeholder="Search classes"
      onChange={handleChange}
    />
  );
};
