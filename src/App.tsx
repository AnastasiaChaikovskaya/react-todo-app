import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { MAIN_ROUTS } from "./constants/routs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./modules/shared/MainLayout";
import TodosPage from "./pages/TodosPage";


const routs = createBrowserRouter([
  {
    path: MAIN_ROUTS.LOGIN,
    element: <LoginPage />
  },
  {
    path: MAIN_ROUTS.REGISTER,
    element: <RegisterPage />
  },
  {
    path: MAIN_ROUTS.TODOS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
      {
        path: MAIN_ROUTS.TODO,
        element: <TodosPage />
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={routs} />
  )
}

export default App
