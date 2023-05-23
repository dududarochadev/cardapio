import Typography from '@mui/material/Typography';
import { LayoutBase } from '../../shared/layouts';
import { Avatar, Box, Grid, Icon, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { servicoDeProduto } from '../../shared/services/api/produto/servicoDeProduto';
import { Button } from '../../shared/components/MUI/button/Button';

export const PaginaInicial = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const { data: produtos } = useQuery(
    ['produtos'],
    () => servicoDeProduto.listar()
  );

  return (
    <LayoutBase>
      <Grid container spacing={3}>
        <Grid item lg={4} xs={12}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
              <Box display='flex' justifyContent='end' flex={1} marginRight={1}>
                <IconButton onClick={() => navigate('/perfil')}>
                  <Icon>edit</Icon>
                </IconButton>

                {lgDown && <IconButton>
                  <Icon>expand_more</Icon>
                </IconButton>}
              </Box>


              <Box display='flex' justifyContent='center' marginBottom={2}>
                <Avatar src={'/assets/images/fotos-de-perfil/Floripa.jpg'} sx={{ height: 150, width: 150 }} />
              </Box>

              <Box display='flex' flexDirection='column' gap={1}>
                <Typography align='center' variant='h6'>{'Eduardo'}</Typography>
                <Typography align='center'>{'eduardo@gmail.com'}</Typography>
                <Typography align='center'>{'51 95982454'}</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
              <Box display='flex' flexDirection='column' gap={3}>
                <Box display='flex' justifyContent='space-between'>
                  <Typography variant='h4'>Ver produtos</Typography>

                  <Button label='+ Novo' variant='contained' onClick={() => navigate('/produto/novo')} />
                </Box>

                <Box display='flex' flexDirection='column' gap={2}>
                  <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                    <Box display='flex' flexDirection='column'>
                      {produtos && produtos.map((produto) =>
                        <Box key={produto.id} display='flex' justifyContent='space-between' alignItems='center' margin={1}>
                          <Box display='flex' gap={1}>
                            <Box border={2}>
                              <img src='' />
                            </Box>

                            <Box>
                              <Typography variant='h4'>{produto.descricao}</Typography>
                              <Typography>{produto.valor}</Typography>
                            </Box>
                          </Box>

                          <Box>
                            <IconButton
                              onClick={() => navigate(`/produto/${produto.id}`)}
                            >
                              <Icon>edit</Icon>
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Paper>

          </Box>
        </Grid>
      </Grid>
    </LayoutBase >
  );
};