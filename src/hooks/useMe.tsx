import { USER_QUERY_KEYS } from '@/constants/query-keys';
import { getMe } from '@/servises/auth';
import useUserStore from '@/store/UserStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useMe = () => {
  const setAuth = useUserStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: [USER_QUERY_KEYS.CURRENT_USER],
    queryFn: getMe,
  });

  useEffect(() => {
    if (isSuccess) {
      setAuth(true);
      setUser(data);
      setLoading(false);
    }

    if (isError) {
      setLoading(false);
    }
  }, [isError, isSuccess, data, setAuth, setLoading, setUser]);

  return { isLoading };
};
