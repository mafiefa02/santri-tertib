import { Button, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { logout } from './_actions/logout';

const LogoutPage = () => {
  return (
    <div className="container flex flex-grow flex-col items-center justify-center gap-5 text-center">
      <div className="flex flex-col gap-1">
        <Title order={3}>Are you sure you want to log out?</Title>
        <Title className="font-normal" order={5}>
          You can always login again later
        </Title>
      </div>
      <form action={logout} className="flex w-full max-w-80 items-center gap-2">
        <Button fullWidth component={Link} href="/" size="xs" variant="light">
          Take me back
        </Button>
        <Button fullWidth size="xs" type="submit">
          Yes
        </Button>
      </form>
    </div>
  );
};

export default LogoutPage;
