import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
} from '@mantine/core';
import type { $Enums } from '@prisma/client';
import { IconSearch } from '@tabler/icons-react';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-body-loading';

import { AccountTypeFilter } from './_components/account-type-filter';
import { AccountsRegistered } from './_components/accounts-registered';

export const revalidate = 600; // opt-in to revalidate every 10 minutes

const AccountsDashboardPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const type = searchParams.type as $Enums.Role | undefined;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TextInput
          className="w-full min-w-fit md:max-w-80"
          leftSection={<IconSearch size={16} />}
          placeholder="Search accounts"
        />
        <Suspense>
          <AccountTypeFilter />
        </Suspense>
      </div>
      <TableScrollContainer minWidth={768}>
        <Paper withBorder>
          <Table highlightOnHover stickyHeader>
            <TableThead>
              <TableTr className="text-mtn-primary-filled dark:text-mtn-primary-light-color">
                {columns.map((column) => (
                  <TableTh key={`${column}column`}>{column}</TableTh>
                ))}
              </TableTr>
            </TableThead>
            <Suspense
              fallback={<TableBodyLoading columnCount={columns.length} />}
            >
              <AccountsRegistered type={type} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = ['Account Name', 'Username', 'Type'];

export default AccountsDashboardPage;
