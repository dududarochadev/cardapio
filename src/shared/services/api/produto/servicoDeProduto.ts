import { Api } from '../axios-config';

export interface IProduto {
  id: number;
  descricao: string;
  valor: number;
}

export interface ICadastrarProduto {
  descricao: string;
  valor: number;
}

const incluir = async (body: ICadastrarProduto): Promise<IProduto> => {
  try {
    const { data } = await Api.post<IProduto>(
      '/produto',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IProduto): Promise<IProduto> => {
  try {
    const { data } = await Api.put<IProduto>(
      '/produto',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const excluir = async (id: number): Promise<boolean> => {
  try {
    const { data } = await Api.delete<boolean>(
      `/produto?id=${id}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const listar = async (): Promise<IProduto[]> => {
  try {
    const { data } = await Api.get<IProduto[]>(
      '/produto'
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
  }
};

const obterPorId = async (id: number): Promise<IProduto> => {
  try {
    const { data } = await Api.get<IProduto>(
      `/produto/obter?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter produto.');
  }
};

export const servicoDeProduto = {
  incluir,
  editar,
  excluir,
  listar,
  obterPorId
};