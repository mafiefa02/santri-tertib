import { TableTbody, TableTd, TableTr } from '@mantine/core';
import dayjs, { extend } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import React from 'react';

import prisma from '@/config/db';

import { AccountTypeBadge } from './account-type-column';

extend(LocalizedFormat);
extend(utc);

export const LastLogin = async () => {
  const data = await prisma.loginHistory.findMany({
    orderBy: { loginTime: 'desc' },
    take: 10,
  });
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
            {dayjs(row.loginTime).utc().local().format('LL HH:mm:ss')}
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};
