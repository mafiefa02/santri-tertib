import { TableTbody, TableTd, TableTr } from '@mantine/core';
import React from 'react';

import { findManyLoginHistory } from '../_queries/find-many-login-history';

import { AccountTypeBadge } from './account-type-badge';
import { LastLoginTime } from './last-login-time';

export const LastLogin = async () => {
  const data = await findManyLoginHistory();
  if (!data.length) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.accountName}</TableTd>
          <TableTd>{row.accountUsername}</TableTd>
          <TableTd>
            <AccountTypeBadge type={row.accountType} />
          </TableTd>
          <TableTd>
            <LastLoginTime loginTime={row.loginTime} />
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
