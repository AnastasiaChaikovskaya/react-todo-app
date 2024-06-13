import { useToast } from '@/components/ui/use-toast';
import { AUTH_QUERY_KEYS } from '@/constants/query-keys';
import { MAIN_ROUTS } from '@/constants/routs';
import { login, register } from '@/servises/auth';
import useUserStore from '@/store/UserStore';
import { useMutation } from '@tanstack/react-query';
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

  return useMutation({
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
    onError: () => {
      toast({
        title: 'Register failed',
        description: 'Unable to register with provided credentials',
      });
    },
  });
};
