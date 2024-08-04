import {
  ActionIcon,
  Menu,
  MenuDropdown,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';

import { AddViolationCategoryModal } from './add-violation-category-modal';
import { AddViolationModal } from './add-violation-modal';

export const AddViolationOrCategory = () => {
  return (
    <ModalsProvider>
      <Menu withArrow>
        <MenuTarget>
          <ActionIcon
            aria-label="Create new violation or violation categories button"
            className="bg-mtn-primary-filled text-white"
            size="input-sm"
          >
            <IconPlus size={16} />
          </ActionIcon>
        </MenuTarget>
        <MenuDropdown>
          <MenuLabel>Violation</MenuLabel>
          <AddViolationModal />
          <MenuLabel>Categories</MenuLabel>
          <AddViolationCategoryModal />
        </MenuDropdown>
      </Menu>
    </ModalsProvider>
  );
};
