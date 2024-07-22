import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToTitle(string?: string) {
  if (!string) return;
  const lowercase = string.toLowerCase();
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
}
