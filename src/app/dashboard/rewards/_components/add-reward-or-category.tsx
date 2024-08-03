import {
  ActionIcon,
  Menu,
  MenuDropdown,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';

import { AddRewardCategoryModal } from './add-reward-category-modal';
import { AddRewardsModal } from './add-rewards-modal';

export const AddRewardOrCategory = () => {
  return (
    <ModalsProvider>
      <Menu withArrow>
        <MenuTarget>
          <ActionIcon
            aria-label="Create new reward or reward categories button"
            className="bg-mtn-primary-filled text-white"
            size="input-sm"
          >
            <IconPlus size={16} />
          </ActionIcon>
        </MenuTarget>
        <MenuDropdown>
          <MenuLabel>Reward</MenuLabel>
          <AddRewardCategoryModal />
          <MenuLabel>Categories</MenuLabel>
          <AddRewardsModal />
        </MenuDropdown>
      </Menu>
    </ModalsProvider>
  );
};
