import { useToast } from '@/components/ui/use-toast';
import { USER_QUERY_KEYS } from '@/constants/query-keys';
import { updatePassword } from '@/servises/auth';
import { IUpdatePasswordRequest } from '@/types/AuthResponse';
import { User } from '@/types/User';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdatePassword = () => {
  const { toast } = useToast();

  return useMutation<User, AxiosError<{ error: string; status: number }>, IUpdatePasswordRequest>({
    mutationKey: [USER_QUERY_KEYS.UPDATE_PASSWORD],
    mutationFn: updatePassword,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'You have changed your password',
      });
    },
    onError: ({ response }) => {
      if (response?.data.error) {
        toast({
          variant: 'destructive',
          title: 'Register failed',
          description: response.data.error,
        });
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Register failed',
        description: 'Unable to register with provided credentials',
      });
    },
  });
};
