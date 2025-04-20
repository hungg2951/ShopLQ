'use client';

import useSWR from 'swr';
import { getToken, removeToken } from '@/utils/token';
import instance from '@/api/instance';
import { authAPI } from '@/api/auth';

const fetchUser = async () => {
  const token = getToken();
  if (!token) throw new Error('No token');
  const res = await authAPI.me()
  return res.data;
};

export const useAuth = () => {
  const { data, error, isLoading, mutate } = useSWR('user', fetchUser);

  const logout = () => {
    removeToken();
    mutate(null);
  };

  return {
    user: data,
    error,
    isLoading,
    isLoggedIn: !!data,
    logout,
    mutateUser: mutate,
  };
};
