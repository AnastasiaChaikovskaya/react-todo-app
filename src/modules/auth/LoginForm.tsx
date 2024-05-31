import React from 'react';
import CardWrapper from './CardWrapper';

function LoginForm() {
  return (
    <CardWrapper
      title="Login"
      label="Login in account"
      backButtonLabel="Don`t have an account? Sing up here."
      backButtonHref="/register"
    ></CardWrapper>
  );
}

export default LoginForm;
