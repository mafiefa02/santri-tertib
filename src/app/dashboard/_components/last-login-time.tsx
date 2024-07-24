'use client';

import dayjs, { extend } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

extend(LocalizedFormat);

export const LastLoginTime = ({ loginTime }: { loginTime: Date }) => {
  return dayjs(loginTime).format('LL HH:mm:ss');
};
