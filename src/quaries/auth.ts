import { useToast } from '@/components/ui/use-toast';
import { AUTH_QUERY_KEYS } from '@/constants/query-keys';
import { MAIN_ROUTS } from '@/constants/routs';
import { login } from '@/servises/auth';
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
      localStorage.setItem('token', responseData.token);
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
