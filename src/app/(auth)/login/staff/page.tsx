import React from 'react';

import { LoginForm } from '../../_components/login-form';

const LoginPage = () => {
  return (
    <div className="container flex flex-grow items-center justify-center">
      <LoginForm type="user" />
    </div>
  );
};

export default LoginPage;
