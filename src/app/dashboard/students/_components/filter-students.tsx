'use client';

import {
  Button,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { IconFilterPlus, IconHomeDot } from '@tabler/icons-react';
import { Suspense } from 'react';

import { StudentDormitorySelect } from '@/components/student-dormitory-select';
import { useQueryString } from '@/hooks/use-query-string';

import { ActiveFiltersBadge } from './active-filters-badge';

interface Filters {
  dormitory?: string;
  studentClass?: string;
  group?: 'students' | 'dormitories';
}

export const FilterStudents = ({ dormitory, studentClass, group }: Filters) => {
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
        <MenuLabel>Dormitory</MenuLabel>
        <MenuItem>
          <StudentDormitorySelect
            className="w-full md:max-w-56"
            comboboxProps={{ withinPortal: false }}
            defaultValue={dormitory}
            leftSection={<IconHomeDot size={16} />}
            placeholder="Select dormitory"
            onChange={(value) => updateQuery({ name: 'dormitory', value })}
          />
        </MenuItem>
        <MenuLabel>Class</MenuLabel>
        <MenuItem>
          {/* <ViolationCategoriesSelect

          className="w-full md:max-w-56"
          comboboxProps={{ withinPortal: false }}
          defaultValue={category}
          leftSection={<IconCategory2 size={16} />}
          placeholder="Select category"
          onChange={(value) => updateQuery({ name: 'category', value })}
        /> */}
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};
