import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header/Header';
import useUserStore from '@/store/UserStore';
import { MAIN_ROUTS } from '@/constants/routs';

export default function MainLayout() {
  const isAuth = useUserStore((state) => state.isAuth);
  const isLoading = useUserStore((state) => state.isLoading);

  if (!isLoading && !isAuth) {
    return <Navigate replace to={MAIN_ROUTS.LOGIN} />;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
        <Outlet />
      </div>
    </>
  );
}
