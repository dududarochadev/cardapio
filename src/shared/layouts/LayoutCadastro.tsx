import { Box, Divider, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Button } from '../components/MUI/button/Button';

type Props = {
  children?: React.ReactNode;
  header?: string | React.ReactNode;
  esconderBotaoSalvar?: boolean;
};

export const LayoutCadastro: React.FC<Props> = ({ children, header, esconderBotaoSalvar }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container xs={12} >
      <Grid container maxWidth='lg' component={Paper}>
        {header &&
          <>
            <Grid item xs={12}>
              {typeof (header) === 'string' &&
                <Box display='flex' flex={1} justifyContent='center' padding={3}>
                  <Typography variant={mdDown ? 'h5' : 'h4'}>{header}</Typography>
                </Box>
              }

              {typeof (header) === 'object' &&
                <>
                  {header}
                </>
              }

              {/* Colocar a foto da barbearia do lado direito e o título centralizado */}
              {/* <Box display='flex' justifyContent='space-between'>
              <Box display='flex' flex={1} justifyContent='center'>
                  <Typography variant={mdDown ? 'h5' : 'h4'}>{header}</Typography>
                </Box>

                <Box display='flex' justifyContent='end'>
                  <img
                  src={Logo}
                  alt='logo'
                    height={80}
                    style={{ cursor: 'pointer', position: 'absolute' }}
                  />
                </Box>
              </Box> */}
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        }

        <Grid item xs={12} sx={{ height: 600, overflow: 'auto' }}>
          <Box padding={3}>
            {children}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {!esconderBotaoSalvar &&
          <Grid item xs={12} display='flex' justifyContent='end' padding={2}>
            <Button variant='contained' label='Salvar' minWidth={200} />
          </Grid>
        }
      </Grid>
    </Grid >
  );
};