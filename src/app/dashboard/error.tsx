'use client';

import { Button, Title } from '@mantine/core';
import React from 'react';

const DashboardErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="m-auto flex size-full max-w-[30rem] flex-col items-center justify-center gap-4 text-center">
      <div className="flex w-full flex-col items-center gap-1">
        <Title order={2}>Something went wrong!</Title>
        <Title className="font-normal" order={5}>
          Try to reload the page and see if it works.
        </Title>
      </div>
      <p className="w-full rounded border px-3 py-2">{error.message}</p>
      <Button fullWidth onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default DashboardErrorBoundary;
