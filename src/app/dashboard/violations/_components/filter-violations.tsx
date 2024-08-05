'use client';

import {
  Button,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { type $Enums } from '@prisma/client';
import { IconCategory2, IconFilterPlus, IconFlag } from '@tabler/icons-react';
import { Suspense } from 'react';

import { ViolationCategoriesSelect } from '@/components/violation-categories-select';
import { ViolationTypeSelect } from '@/components/violation-type-select';
import { useQueryString } from '@/hooks/use-query-string';

import { ActiveFiltersBadge } from './active-filters-badge';

export const FilterViolations = ({
  category,
  type,
}: {
  category?: string;
  type?: $Enums.ViolationType;
}) => {
  const { updateQuery } = useQueryString();

  return (
    <Menu closeOnItemClick={false}>
      <MenuTarget>
        <Button
          fullWidth
          justify="left"
          leftSection={<IconFilterPlus size={16} />}
          variant="default"
          rightSection={
            <Suspense>
              <ActiveFiltersBadge />
            </Suspense>
          }
        >
          Filters
        </Button>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Type</MenuLabel>
        <MenuItem>
          <ViolationTypeSelect
            className="w-full md:max-w-56"
            comboboxProps={{ withinPortal: false }}
            defaultValue={type}
            leftSection={<IconFlag size={16} />}
            placeholder="Select type"
            onChange={(value) => updateQuery({ name: 'type', value })}
          />
        </MenuItem>
        <MenuLabel>Category</MenuLabel>
        <MenuItem>
          <ViolationCategoriesSelect
            className="w-full md:max-w-56"
            comboboxProps={{ withinPortal: false }}
            defaultValue={category}
            leftSection={<IconCategory2 size={16} />}
            placeholder="Select category"
            onChange={(value) => updateQuery({ name: 'category', value })}
          />
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};
