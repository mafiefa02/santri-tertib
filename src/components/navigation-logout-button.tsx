'use client';

import { MenuItem, type MenuItemProps } from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react';

export const NavigationLogoutButton = (props: MenuItemProps) => {
  const logout = () => signOut({ callbackUrl: '/' });
  return (
    <MenuItem {...props} onClick={logout}>
      {props.children}
    </MenuItem>
  );
};
