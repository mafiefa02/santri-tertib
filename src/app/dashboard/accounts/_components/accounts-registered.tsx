import { ActionIconGroup, TableTbody, TableTd, TableTr } from '@mantine/core';

import { auth } from '@/config/auth';

import { AccountTypeBadge } from '../../_components/account-type-badge';
import {
  type FindManyUserParam,
  findManyUser,
} from '../_queries/find-many-user';

import { DeleteAccountModal } from './delete-account-modal';
import { ResetPasswordModal } from './reset-password-modal';

export const AccountsRegistered = async ({
  type,
  search,
}: FindManyUserParam) => {
  const session = await auth();
  const data = await findManyUser({ type, search });

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.displayName}</TableTd>
          <TableTd>{row.username}</TableTd>
          <TableTd>
            <AccountTypeBadge type={row.type} />
          </TableTd>
          <TableTd>
            {session?.user.id === row.id ? null : (
              <ActionIconGroup className="space-x-2">
                <ResetPasswordModal
                  userDisplayName={row.displayName}
                  userId={row.id}
                />
                <DeleteAccountModal
                  userDisplayName={row.displayName}
                  userId={row.id}
                />
              </ActionIconGroup>
            )}
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
