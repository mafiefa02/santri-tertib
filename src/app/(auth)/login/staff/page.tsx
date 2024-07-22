import { Title } from '@mantine/core';
import React from 'react';

import { LoginForm } from '../../_components/login-form';

const LoginPage = () => {
  return (
    <div className="container flex flex-grow items-center justify-center">
      <div className="mx-auto flex w-full max-w-80 flex-col gap-5">
        <div className="flex flex-col gap-0 text-pretty">
          <Title
            className="text-mtn-primary-filled dark:text-mtn-primary-light-color"
            order={1}
          >
            Staff Login
          </Title>
          <p className="text-xs">
            Use the given username and password to login
          </p>
        </div>
        <LoginForm type="user" />
      </div>
    </div>
  );
};

export default LoginPage;
