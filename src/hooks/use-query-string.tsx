'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface QueryParam {
  name: string;
  value: string | null;
}

export const useQueryString = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    ({ name, value }: QueryParam) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const updateQuery = ({ name, value }: QueryParam) => {
    router.push(`${pathname}?${createQueryString({ name, value })}`);
  };

  return { createQueryString, updateQuery };
};
