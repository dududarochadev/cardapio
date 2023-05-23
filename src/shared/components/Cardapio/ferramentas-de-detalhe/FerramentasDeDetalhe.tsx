import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  aoCarregarBotaoVoltar?: boolean;
  aoCarregarBotoesCRUD?: boolean;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  aoCarregarBotaoVoltar = false,
  aoCarregarBotoesCRUD = false,

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      component={Paper}
      height={theme.spacing(5)}
    >
      {mostrarBotaoSalvar && !aoCarregarBotoesCRUD &&
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' noWrap>
            Salvar
          </Typography>
        </Button>
      }

      {mostrarBotaoSalvarEFechar && !aoCarregarBotoesCRUD && !mdDown &&
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' noWrap>
            Salvar e fechar
          </Typography>
        </Button>
      }

      {mostrarBotaoApagar && !aoCarregarBotoesCRUD &&
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' noWrap>
            Apagar
          </Typography>
        </Button >
      }

      {mostrarBotaoNovo && !aoCarregarBotoesCRUD && !smDown &&
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' noWrap>
            {textoBotaoNovo}
          </Typography>
        </Button >
      }

      {aoCarregarBotoesCRUD &&
        <Skeleton width={smDown ? 220 : mdDown ? 330 : 440} height={66} />
      }

      {mostrarBotaoVoltar && (mostrarBotaoApagar || mostrarBotaoNovo || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar) &&
        < Divider variant='middle' orientation='vertical' />
      }

      {mostrarBotaoVoltar && !aoCarregarBotaoVoltar &&
        <Box display='flex' flex={1} justifyContent='end'>
          <Button
            color='primary'
            disableElevation
            variant='outlined'
            onClick={aoClicarEmVoltar}
            startIcon={<Icon>arrow_back</Icon>}
          >
            <Typography variant='button' noWrap>
              Voltar
            </Typography>
          </Button >
        </Box>
      }

      {aoCarregarBotaoVoltar &&
        <Skeleton width={110} height={66} />
      }
    </Box >
  );
};