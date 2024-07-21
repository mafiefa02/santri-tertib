'use client';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import type React from 'react';
import { type z } from 'zod';

import { useLogin } from '../_hooks/use-login';
import { schema } from '../_schemas/login-schema';

export const LoginForm = ({ type }: { type: 'student' | 'user' }) => {
  const { mutate, isPending } = useLogin(type);
  const form = useForm<z.infer<typeof schema>>({
    mode: 'uncontrolled',
    validate: zodResolver(schema),
  });

  return (
    <form
      className="min-w-80 space-y-3"
      onSubmit={form.onSubmit((values) => mutate(values))}
    >
      <TextInput
        key={form.key('username')}
        label="Username"
        placeholder="Enter your username here"
        {...form.getInputProps('username')}
      />

      <PasswordInput
        key={form.key('password')}
        label="Password"
        placeholder="Enter your password here"
        {...form.getInputProps('password')}
      />

      <div className="flex flex-col gap-2">
        <Button fullWidth loading={isPending} type="submit">
          Login
        </Button>
        <Link
          className="group text-right text-xs"
          href={`/login${type === 'user' ? '' : '/staff'}`}
        >
          Login as{' '}
          <span className="font-semibold group-hover:text-primary-700">
            {type === 'user' ? 'Staff / Admin' : 'Student'}
          </span>
        </Link>
      </div>
    </form>
  );
};
