import { getMe, login, register } from '@/servises/auth';
import { User } from '@/types/User';
import { create } from 'zustand';

interface IUserState {
  user: User;
  isAuth: boolean;
  setUser: (user: User) => void;
  loginUser: (email: string, password: string) => void;
  registerUser: (username: string, email: string, password: string) => void;
  getUser: () => void;
}

const useUserStore = create<IUserState>((set) => ({
  user: {} as User,
  isAuth: false,
  isRegister: false,
  setUser: (newUser: User) => set((state) => ({ ...state, user: newUser })),
  setAuth: (boolean: boolean) => set((state) => ({ ...state, isAuth: boolean })),
  loginUser: async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      set((state) => ({ ...state, isAuth: true, user: response.data.user }));
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  registerUser: async (username: string, email: string, password: string) => {
    try {
      const response = await register(username, email, password);
      localStorage.setItem('token', response.data.accessToken);
      set((state) => ({ ...state, isAuth: true, user: response.data.user }));
    } catch (error) {
      throw new Error('Failed to register');
    }
  },
  getUser: async () => {
    try {
      const response = await getMe();
      set((state) => ({ ...state, isAuth: true, user: response.data.user }));
    } catch (error) {
      throw new Error('Failed with auth');
    }
  },
}));

export default useUserStore;
