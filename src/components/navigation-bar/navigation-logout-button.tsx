'use client';

import { MenuItem, type MenuItemProps } from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

export const NavigationLogoutButton = (props: MenuItemProps) => {
  const logout = () => {
    toast.loading('We are logging you out...');
    return signOut({ callbackUrl: '/' });
  };

  return (
    <MenuItem aria-label="Logout button" {...props} onClick={logout}>
      {props.children}
    </MenuItem>
  );
};
