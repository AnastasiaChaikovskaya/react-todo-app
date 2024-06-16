import { useToast } from '@/components/ui/use-toast';
import { AUTH_ENDPOINTS } from '@/constants';
import { MAIN_ROUTS } from '@/constants/routs';
import { refreshToken } from '@/servises/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useRefreshToken = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [AUTH_ENDPOINTS.REFRESH],
    mutationFn: refreshToken,
    onSuccess: (responseData) => {
      localStorage.setItem('token', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
    },
    onError: () => {
      navigate(MAIN_ROUTS.LOGIN);
      toast({
        variant: 'destructive',
        title: 'Warning',
        description: 'Your session has ended',
      });
    },
  });
};
