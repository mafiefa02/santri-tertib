import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import type { $Enums } from '@prisma/client';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-body-loading';

import { AccountSearch } from './_components/account-search';
import { AccountTypeFilter } from './_components/account-type-filter';
import { AccountsRegistered } from './_components/accounts-registered';
import { AddAccountModal } from './_components/add-account-modal';

export const revalidate = 600; // opt-in to revalidate every 10 minutes

const AccountsDashboardPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const type = searchParams.type as $Enums.Role | undefined;
  const search = searchParams.search as string | undefined;

  return (
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
      <TableScrollContainer minWidth={340}>
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
              <AccountsRegistered search={search} type={type} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = ['Account Name', 'Username', 'Type'];

export default AccountsDashboardPage;
