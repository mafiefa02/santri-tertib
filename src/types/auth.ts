import type { CredentialInput } from 'next-auth/providers/credentials';

export interface LoginPayload extends CredentialInput {
  username: string;
  password: string;
}
