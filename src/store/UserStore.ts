import { User } from '@/types/User';
import { create } from 'zustand';

interface IUserState {
  user: User;
  isAuth: boolean;
  isLoading: boolean;
  setAuth: (auth: boolean) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

const initState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
  isAuth: false,
  isLoading: true,
};

const useUserStore = create<IUserState>((set) => ({
  ...initState,
  setUser: (newUser: User) => set((state) => ({ ...state, user: newUser })),
  setAuth: (auth: boolean) => set((state) => ({ ...state, isAuth: auth })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, isLoading: loading })),
  resetStore: () => set(initState),
}));

export default useUserStore;
