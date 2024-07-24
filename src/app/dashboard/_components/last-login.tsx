import { Badge, Skeleton, TableTbody, TableTd, TableTr } from '@mantine/core';
import type { $Enums } from '@prisma/client';
import dayjs, { extend } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

import prisma from '@/config/db';

extend(LocalizedFormat);

export const LastLoginLoading = () => {
  return (
    <TableTbody>
      {Array.from({ length: 10 }, (_, index) => (
        <TableTr key={index}>
          <TableTd>
            <Skeleton className="h-5 w-full" />
          </TableTd>
          <TableTd>
            <Skeleton className="h-5 w-full" />
          </TableTd>
          <TableTd>
            <Skeleton className="h-5 w-full" />
          </TableTd>
          <TableTd>
            <Skeleton className="h-5 w-full" />
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const AccountTypeColumn = ({ type }: { type: $Enums.Role }) => {
  switch (type) {
    case 'ADMIN':
      return <Badge variant="filled">{type}</Badge>;
    case 'STAFF':
      return <Badge variant="light">{type}</Badge>;
    case 'STUDENT':
      return <Badge variant="outline">{type}</Badge>;
  }
};

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
            <AccountTypeColumn type={row.accountType} />
          </TableTd>
          <TableTd>{dayjs(row.loginTime).format('LL HH:mm:ss')}</TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};
