import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from '@mantine/core';
import type { $Enums } from '@prisma/client';
import { IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

import { formatToTitle } from '@/utils/format-to-title';

import { NavigationLogoutButton } from './navigation-logout-button';

export const SessionDropdown = ({
  username,
  avatar,
  type,
}: {
  username: string;
  avatar?: string;
  type: $Enums.Role;
}) => {
  return (
    <Menu>
      <MenuTarget>
        <Avatar
          aria-label="Account action button"
          className="hover:cursor-pointer"
          color="blue"
          name={username}
          role="button"
          src={avatar ?? undefined}
        />
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel className="flex items-center gap-4 font-bold text-mtn-primary-filled dark:text-mtn-primary-light-color">
          {username}
          <span className="font-normal">{formatToTitle(type)}</span>
        </MenuLabel>
        <MenuDivider />
        <MenuItem
          aria-label="Profile button"
          component={Link}
          href="/profile"
          leftSection={
            <IconUser
              className="text-mtn-primary-filled dark:text-mtn-primary-light-color"
              size={16}
            />
          }
        >
          Profile
        </MenuItem>
        <NavigationLogoutButton
          leftSection={
            <IconLogout
              className="text-mtn-primary-filled dark:text-mtn-primary-light-color"
              size={16}
            />
          }
        >
          Logout
        </NavigationLogoutButton>
      </MenuDropdown>
    </Menu>
  );
};
