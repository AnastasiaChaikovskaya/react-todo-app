import { useToast } from '@/components/ui/use-toast';
import { AUTH_QUERY_KEYS } from '@/constants/query-keys';
import { MAIN_ROUTS } from '@/constants/routs';
import { TRegisterRequestData, login, register } from '@/servises/auth';
import useUserStore from '@/store/UserStore';
import { IRegisterResponse } from '@/types/AuthResponse';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const setAuth = useUserStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationKey: [AUTH_QUERY_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: (responseData) => {
      setUser(responseData.user);
      localStorage.setItem('token', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      setAuth(true);
      navigate(MAIN_ROUTS.TODOS);
    },
    onError: () => {
      toast({
        title: 'Login failed',
        description: 'Unable to login with provided credentials',
      });
    },
  });
};

export const useRegisterMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const setAuth = useUserStore((state) => state.setAuth);

  return useMutation<IRegisterResponse, AxiosError<{ error: string; status: number }>, TRegisterRequestData>({
    mutationKey: [AUTH_QUERY_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: (responseData) => {
      localStorage.setItem('token', responseData.accessToken);
      setAuth(true);
      navigate(MAIN_ROUTS.LOGIN);
      toast({
        title: 'Register success',
        description: 'Now login with your credentials',
      });
    },
    onError: ({ response }) => {
      if (response?.data.error) {
        toast({
          title: 'Register failed',
          description: response.data.error,
        });
        return;
      }

      toast({
        title: 'Register failed',
        description: 'Unable to register with provided credentials',
      });
    },
  });
};
