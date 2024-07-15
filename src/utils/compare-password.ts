import { compare } from 'bcryptjs';

export function comparePassword(unhashed: string, hashed: string) {
  return compare(unhashed, hashed).then((result) => ({
    passwordIsSame: result,
  }));
}
