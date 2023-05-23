import { Box, Container } from '@mui/material';
import { BarraSuperior } from '../components/Cardapio/barra-superior/BarraSuperior';

type Props = {
  children?: React.ReactNode;
  barraDeFerramentas?: React.ReactNode;
};

export const LayoutBase: React.FC<Props> = ({ children, barraDeFerramentas }) => {

  return (
    <Box>
      <BarraSuperior />

      <Box height='100%' display='flex' flexDirection='column' padding={3}>
        <main style={{ flexGrow: 1, maxWidth: 'lg' }}>
          <Container maxWidth='lg' sx={{ height: '100%' }}>
            {barraDeFerramentas &&
              <Box marginBottom={2}>
                {barraDeFerramentas}
              </Box>
            }

            {children}
          </Container>
        </main>
      </Box >
    </Box>
  );
};