import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { Environment } from '../../environment';
import { feedback } from '../alertService';

export const queryClient = new QueryClient({

  defaultOptions: {
    queries: {
      onError: async (err: any) => {
        if (err.statusCode === 401) {
          localStorage.removeItem('access_token');
          redirect(Environment.baseUrl + '/login');
        }

        feedback(String(err), 'error');
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 0,
    },
    mutations: {
      onError: async (err: any) => {
        feedback(String(err), 'error');
      },
    },
  },
});
