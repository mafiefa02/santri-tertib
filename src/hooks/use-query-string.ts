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
      value ? params.set(name, value) : params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  const resetQuery = () => router.push(pathname);
  const updateQuery = ({ name, value }: QueryParam) =>
    router.push(`${pathname}?${createQueryString({ name, value })}`);

  return { resetQuery, updateQuery };
};
