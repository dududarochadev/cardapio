import { useCallback, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { IProduto, servicoDeProduto } from '../../shared/services/api/produto/servicoDeProduto';
import { useQuery } from '@tanstack/react-query';
import { LayoutBase } from '../../shared/layouts';


export const ListagemProdutos: React.FC = () => {
  const [textoBusca, setTextoBusca] = useState<string>();

  const navigate = useNavigate();


  const { data: produtos, isLoading } = useQuery(
    ['produtos'],
    () => servicoDeProduto.listar()
  );

  const handleExcluir = useCallback(async (id: number) => {
    await servicoDeProduto.excluir(id);

    console.log('Excluido com sucesso!');
  }, []);

  const handleEditar = useCallback(async (produto: IProduto) => {
    const result = await servicoDeProduto.editar(produto);

    console.log(result);
  }, []);

  return (
    <LayoutBase
      barraDeFerramentas={
        <FerramentasDaListagem
          textoDaBusca={textoBusca}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          aoMudarTextoDaBusca={(texto) => setTextoBusca(texto)}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos && produtos.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleExcluir(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/produto/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};