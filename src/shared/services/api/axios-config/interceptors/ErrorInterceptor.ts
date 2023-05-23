import { AxiosError } from 'axios';
import { LOCAL_STORAGE_KEY } from '../../../../contexts/UserContext';

export const errorInterceptor = (error: AxiosError) => {

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(false));
    window.location.href = 'http://localhost:3000/pagina-inicial';
  }

  if (error.response?.status === 403) {
    window.location.href = 'http://localhost:3000/sem-permissao';
  }

  return Promise.reject(error);
};