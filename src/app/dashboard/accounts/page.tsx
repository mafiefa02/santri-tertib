import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-body-loading';

import { AccountsRegistered } from './_components/accounts-registered';

export const revalidate = 600; // opt-in to revalidate every 10 minutes
const columns = ['Account Name', 'Username', 'Type'];

const AccountsDashboardPage = () => {
  return (
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
            <AccountsRegistered />
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

export default AccountsDashboardPage;
