import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export const AuthHeader = () => {
  return (
    <header className="dark:bg-dark-body bg-light-body sticky top-0 flex w-full py-3">
      <div className="container flex items-center justify-between text-sm">
        <span className="font-bold">Santri Tertib</span>
        <Button
          className="group text-xs font-normal"
          component={Link}
          href="/"
          variant="transparent"
          leftSection={
            <IconArrowLeft
              className="transition-all group-hover:-translate-x-px"
              size={16}
            />
          }
        >
          Back to home
        </Button>
      </div>
    </header>
  );
};
