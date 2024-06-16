import { MAIN_ROUTS } from '@/constants/routs';
import useUserStore from '@/store/UserStore';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout() {
  const isAuth = useUserStore((state) => state.isAuth);
  const isLoading = useUserStore((state) => state.isLoading);

  if (isAuth && !isLoading) {
    return <Navigate replace to={MAIN_ROUTS.TODOS} />;
  }

  return (
    <div className="h-dvh flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
