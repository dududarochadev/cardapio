import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IPessoa {
  id: number;
  nome: string;
}

const getAll = async (page = 1, filter = ''): Promise<IPessoa | Error> => {
  try {
    const urlRelativa = `/pessoas?_page${page}&_limit${Environment.limiteDeLinhas}&nomeCompleto=${filter}`;
    const { data } = await Api.get<IPessoa>(urlRelativa);

    if (data) {
      return data;
      // totalCount: Number(headers['x-total=count'] || Environment.limiteDeLinhas)
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

export const PessoasService = {
  getAll
};