import { Api } from '../axios-config';

export interface ILogin {
  email: string,
  senha: string,
}

interface IRetornoLogin {
  id: number,
  nome: string
}

const login = async (body: ILogin): Promise<IRetornoLogin> => {
  try {
    const { data } = await Api.post<IRetornoLogin>(
      '/usuario/login',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const logout = async () => {
  try {
    await Api.post('/usuario/logout');

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export interface ICadastroUsuario {
  nomeCompleto: string,
  email: string,
  cpf?: string,
  telefone?: number,
  senha: string,
  confirmacaoDeSenha: string,
}

const cadastrar = async (body: ICadastroUsuario): Promise<IUsuario> => {
  try {
    const { data } = await Api.post<IUsuario>(
      '/usuario/cadastrar',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

interface IUsuario {
  id: number;
  nomeCompleto: string;
  primeiroNome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  sexo: number;
  foto: string;
}

// const obterPorEmail = async (email: string): Promise<IUsuario> => {
//   try {
//     const { data } = await Api.get<IUsuario>(
//       `/usuario?email=${email}`
//     );

//     return data;
//   } catch (error) {
//     throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
//   }
// };

// const obterPorId = async (id: number): Promise<IUsuario> => {
//   try {
//     const { data } = await Api.get<IUsuario>(
//       `/usuario?id=${id}`
//     );

//     return data;
//   } catch (error) {
//     throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
//   }
// };

const obterUsuario = async (): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      '/usuario'
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
  }
};

export const servicoDeAutenticacao = {
  login,
  logout,
  cadastrar,
  obterUsuario,
  // obterPorEmail,
  // obterPorId
};