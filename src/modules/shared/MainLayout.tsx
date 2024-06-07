import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import useUserStore from '@/store/UserStore';

export default function MainLayout() {
  const getUserAuth = useUserStore((state) => state.getUser);
  const isAuth = useUserStore((state) => state.isAuth);
  const navigate = useNavigate();

  const authCheck = async () => {
    await getUserAuth;

    if (!isAuth) {
      navigate('/login');
    }
  };

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
      <Header />
      <div className="flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
        <Outlet />
      </div>
    </>
  );
}
