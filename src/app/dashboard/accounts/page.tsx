import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import type { $Enums } from '@prisma/client';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-loading';

import { AccountSearch } from './_components/account-search';
import { AccountTypeFilter } from './_components/account-type-filter';
import { AccountsRegistered } from './_components/accounts-registered';
import { AddAccountModal } from './_components/add-account-modal';
import { findManyUser } from './_queries/find-many-user';

interface SearchParams {
  type?: $Enums.Role;
  search?: string;
}

const AccountsDashboardPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { type, search } = searchParams;

  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  void findManyUser({ type, search });

  return (
    <ModalsProvider>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Suspense>
            <AccountSearch search={search} />
          </Suspense>
          <div className="flex w-full items-center gap-2 md:max-w-max">
            <Suspense>
              <AccountTypeFilter type={type} />
            </Suspense>
            <AddAccountModal />
          </div>
        </div>
        <TableScrollContainer minWidth={480}>
          <Paper withBorder className="overflow-hidden">
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
                <AccountsRegistered search={search} type={type} />
              </Suspense>
            </Table>
          </Paper>
        </TableScrollContainer>
      </div>
    </ModalsProvider>
  );
};

const columns = ['Account Name', 'Username', 'Type', 'Actions'];

export default AccountsDashboardPage;
