import { LayoutBase } from '../../shared/layouts';
import { Avatar, Box, CircularProgress, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../shared/components/MUI/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { servicoDeProduto } from '../../shared/services/api/produto/servicoDeProduto';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VTextField } from '../../shared/forms';
import * as Yup from 'yup';
import getValidationErrors from '../../shared/helpers/getValidationErrors';

interface IFormData {
  descricao: string,
  valor: number
}

const schema: Yup.Schema<IFormData> = Yup.object().shape({
  descricao: Yup.string().required(),
  valor: Yup.number().required()
});

export const DetalheProduto = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id = '0' } = useParams<'id'>();

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const { data: produto } = useQuery(
    ['produto', id],
    () => servicoDeProduto.obterPorId(parseInt(id))
  );

  useEffect(() => {
    produto && formRef.current?.setData(produto);
  }, [produto]);

  const handleSubmit = useCallback(async (data: IFormData) => {
    try {
      formRef.current?.setErrors({});

      await schema.validate({ descricao: data.descricao, valor: data.valor }, { abortEarly: false });

      setIsLoading(true);

      if (id === 'novo') {
        await servicoDeProduto.incluir({ descricao: data.descricao, valor: data.valor });
      } else {
        await servicoDeProduto.editar({ id: parseInt(id), descricao: data.descricao, valor: data.valor });
      }

      setIsLoading(false);

      navigate('/pagina-inicial');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err as Yup.ValidationError);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <LayoutBase>
      {produto &&
        <Form ref={formRef} onSubmit={handleSubmit} initialData={produto}>
          <Paper
            variant='outlined'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              padding: 3,
            }}
          >
            <Box display='flex' justifyContent='space-between'>
              <Avatar src={'/assets/images/tomate.jpeg'} sx={{ height: 150, width: 150 }} />
            </Box>

            <VTextField name='descricao' label='Descricao' />
            <VTextField name='valor' label='Valor' />

            <Box display='flex' justifyContent='end'>
              <Button
                label={id === 'novo' ? 'Criar' : 'Salvar'}
                variant='contained'
                minWidth={200}
                type='submit'
              />
            </Box>
          </Paper>
        </Form >
      }
    </LayoutBase >
  );
};