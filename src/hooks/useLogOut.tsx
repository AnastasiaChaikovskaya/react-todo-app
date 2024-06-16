import { queryClient } from '@/api/api';
import { useToast } from '@/components/ui/use-toast';
import { MAIN_ROUTS } from '@/constants/routs';
import useUserStore from '@/store/UserStore';
import { useNavigate } from 'react-router-dom';

export const useLogOut = () => {
  const navigate = useNavigate();
  const resetUserStore = useUserStore((state) => state.resetStore);
  const { toast } = useToast();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    resetUserStore();
    navigate(MAIN_ROUTS.LOGIN, { replace: true });
    queryClient.clear();
    toast({
      title: 'System massage',
      description: 'You were successfully log out',
    });
  };

  return { logOut };
};
