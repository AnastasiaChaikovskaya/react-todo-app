import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MAIN_ROUTS } from './constants/routs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './modules/shared/MainLayout';
import TodosPage from './pages/TodosPage';
import AuthLayout from './modules/shared/AuthLayout';
import { useMe } from './hooks/useMe';
import { Loader } from 'lucide-react';
import ProfilePage from './pages/ProfilePage';

const routs = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to={MAIN_ROUTS.LOGIN} />,
      },
      {
        path: MAIN_ROUTS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: MAIN_ROUTS.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to={MAIN_ROUTS.TODOS} />,
      },
      {
        path: MAIN_ROUTS.TODOS,
        element: <TodosPage />,
      },
      {
        path: MAIN_ROUTS.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  const { isLoading } = useMe();
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="w-12 h-12 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <RouterProvider router={routs} />
    </>
  );
}

export default App;
