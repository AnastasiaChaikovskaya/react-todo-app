import React from 'react';
import LoginForm from '@/modules/auth/LoginForm';

function LoginPage() {
  return (
    <div className="h-dvh flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
