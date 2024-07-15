import { hash } from 'bcryptjs';

export function hashPassword(unhashed: string) {
  return hash(unhashed, 10);
}
