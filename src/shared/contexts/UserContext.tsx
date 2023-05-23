import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ICadastroUsuario, ILogin, servicoDeAutenticacao } from '../services/api/auth/servicoDeAutenticacao';

interface IUserContextData {
  isAuthenticated: boolean;
  login: (usuario: ILogin) => Promise<string | void>;
  cadastro: (usuario: ICadastroUsuario) => Promise<string | void>;
  logout: () => void;
}

const UserContext = createContext({} as IUserContextData);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const LOCAL_STORAGE_KEY = 'IS_AUTHENTICATED';

type Props = {
  children?: React.ReactNode,
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticatedStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (isAuthenticatedStorage) {
      setIsAuthenticated(JSON.parse(isAuthenticatedStorage));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = useCallback(async (login: ILogin) => {
    const result = await servicoDeAutenticacao.login(login);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(true));
      setIsAuthenticated(true);
    }
  }, []);

  const handleCadastro = useCallback(async (cadastroUsuario: ICadastroUsuario) => {
    const result = await servicoDeAutenticacao.cadastrar(cadastroUsuario);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(true));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await servicoDeAutenticacao.logout();

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(false));
    setIsAuthenticated(false);
  }, []);

  return (
    <UserContext.Provider value={{ login: handleLogin, cadastro: handleCadastro, logout: handleLogout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
