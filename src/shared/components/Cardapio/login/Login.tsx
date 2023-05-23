import { useCallback, useRef, useState } from 'react';
import { Alert, Box, Card, CardActions, CardContent, Divider, Icon, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { VTextField } from '../../../forms';
import getValidationErrors from '../../../helpers/getValidationErrors';
import { ICadastroUsuario, ILogin, servicoDeAutenticacao } from '../../../services/api/auth/servicoDeAutenticacao';
import { Button } from '../../MUI/button/Button';

interface IFormData {
  nomeCompleto: string,
  email: string,
  cpf?: string,
  telefone?: number,
  senha: string,
  confirmacaoDeSenha: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  senha: Yup.string().required().min(5),
});

const createSchema: Yup.Schema<IFormData> = Yup.object().shape({
  nomeCompleto: Yup.string().required().min(5),
  email: Yup.string().email().required(),
  cpf: Yup.string(),
  senha: Yup.string().required().min(5).matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    'A senha precisa conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial'),
  confirmacaoDeSenha: Yup.string().required().min(5).oneOf([Yup.ref('senha')], 'A confirmação de senha deve ser igual a senha'),
});

const textTooltipPassword =
  `A senha deve conter ao menos:

 - 8 caracteres
 - 1 caractere especial
 - 1 caractere maiúsculo
 - 1 caractere minúsculo
`;

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const [isCadastro, setIsCadastro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirmacao, setMostrarSenhaConfirmacao] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingCadastro, setIsLoadingCadastro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string>();

  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { isAuthenticated, login, cadastro } = useUserContext();

  // useEffect(() => {
  //   function start() {
  //     gapi.auth2.init({
  //       client_id: '689846891590-gd4uvtfgm641dv0q7drfurgng1qi36ks.apps.googleusercontent.com'
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // });

  const handleLogin = useCallback(async (usuario: ILogin) => {
    try {
      const resposta = await login(usuario);

      resposta && setMensagemErro(resposta);

      navigate('/pagina-inicial');
    }
    catch (error: any) {
      const msg = error.message.substring(0, 40);
      setMensagemErro(msg);
    }

  }, []);

  const handleCadastro = useCallback(async (usuario: ICadastroUsuario) => {
    try {
      cadastro(usuario);

      navigate('/pagina-inicial');
    }
    catch (error: any) {
      const msg = error.message.substring(0, 40);
      setMensagemErro(msg);
    }
  }, []);

  const handleContinue = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleClickCadastroLogin = useCallback(() => {
    formRef.current?.reset();
    formRef.current?.setErrors({});
    setMensagemErro('');
    setIsCadastro(!isCadastro);
    setMostrarSenha(false);
  }, [isCadastro]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        if (isCadastro) {
          await createSchema.validate(data, { abortEarly: false });

          setIsLoadingCadastro(true);

          handleCadastro({
            nomeCompleto: data.nomeCompleto,
            email: data.email,
            cpf: data.cpf,
            telefone: data.telefone,
            senha: data.senha,
            confirmacaoDeSenha: data.confirmacaoDeSenha
          }).then(() => {
            setIsLoadingCadastro(false);
          });
        } else {
          await loginSchema.validate({ email: data.email, senha: data.senha }, { abortEarly: false });

          setIsLoadingLogin(true);

          handleLogin({
            email: data.email,
            senha: data.senha
          }).then(() => {
            setIsLoadingLogin(false);
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
        }
      }
    }, [isCadastro]);

  // const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log(response);
  //   response.tokenId && localStorage.setItem('access_token', response.tokenId);
  //   localStorage.setItem('nome_completo', response.profileObj.name);
  // };

  if (isAuthenticated) return (
    <>{children}</>
  );

  return !isCadastro ? (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
        <Card>
          <Box padding={2}>
            <CardContent>
              <Box display='flex' flexDirection='column' gap={2} width={300}>
                <Typography variant='h5' align='center'>
                  Login
                </Typography>

                <Divider variant='middle' />

                {mensagemErro && <Alert severity='error'>{mensagemErro}</Alert>}

                <VTextField
                  fullWidth
                  label='E-mail'
                  name='email'
                  type='email'
                  disabled={isLoadingLogin}
                />

                <VTextField
                  fullWidth
                  label='Senha'
                  name='senha'
                  type={mostrarSenha ? 'text' : 'password'}
                  disabled={isLoadingLogin}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setMostrarSenha(!mostrarSenha)}>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Box display='flex' justifyContent='left'>
                  <Button
                    label='Esqueceu sua senha?'
                    variant='text'
                    onClick={() => undefined}
                    style={{ fontSize: 12 }}
                  />
                </Box>
              </Box>
            </CardContent>


            <CardActions
              sx={{ padding: 0 }}
            >
              <Box display='flex' flexDirection='column' gap={2} width={300} paddingX={2}>

                <Button
                  label='Entrar'
                  variant='contained'
                  disabled={isLoadingLogin}
                  onClick={handleContinue}
                  loading={isLoadingLogin}
                  type='submit'
                />

                <Box display='flex' justifyContent='center'>
                  <Typography>Ou</Typography>
                </Box>

                {/* <GoogleLogin
                  clientId='689846891590-gd4uvtfgm641dv0q7drfurgng1qi36ks.apps.googleusercontent.com'
                  buttonText='Continuar com google'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}

                <Divider variant='middle' />

                <Box display='flex' justifyContent='center' alignItems='center' gap={2} >
                  <Typography fontSize={14}>Não possui uma conta?</Typography>

                  <Button
                    label='Cadastre-se'
                    variant='text'
                    size='small'
                    onClick={handleClickCadastroLogin}
                  />
                </Box>
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Form>
  ) : (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
        <Card>
          <Box padding={2}>
            <CardContent>
              <Box display='flex' flexDirection='column' gap={2} width={300}>
                <Typography variant='h5' align='center'>
                  Faça o seu cadastro
                </Typography>

                <Divider variant='middle' />

                {mensagemErro && <Alert severity='error'>{mensagemErro}</Alert>}

                <VTextField
                  fullWidth
                  label='Nome completo'
                  name='nomeCompleto'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='E-mail'
                  name='email'
                  type='email'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='Cpf'
                  name='cpf'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='Telefone'
                  name='telefone'
                  type='number'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='Senha'
                  name='senha'
                  type={mostrarSenha ? 'text' : 'password'}
                  disabled={isLoadingCadastro}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setMostrarSenha(!mostrarSenha)}>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <VTextField
                  fullWidth
                  label='Confrme sua senha'
                  name='confirmacaoDeSenha'
                  type={mostrarSenhaConfirmacao ? 'text' : 'password'}
                  disabled={isLoadingCadastro}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setMostrarSenhaConfirmacao(!mostrarSenhaConfirmacao)}>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Box display='flex' alignItems='center'>
                  <Typography fontSize={12}>Regras de senha</Typography>
                  <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{textTooltipPassword}</span>} placement='top' arrow>
                    <IconButton><Icon sx={{ fontSize: 14 }}>help_outline</Icon></IconButton>
                  </Tooltip>
                </Box>

                <Box display='flex' justifyContent='left'>
                  <Button
                    label='Esqueceu sua senha?'
                    variant='text'
                    style={{ fontSize: 12 }}
                  />
                </Box>
              </Box>
            </CardContent>


            <CardActions
              sx={{ padding: 0 }}
            >
              <Box display='flex' flexDirection='column' gap={2} width={300} paddingX={2}>

                <Button
                  label='Cadastrar'
                  variant='contained'
                  disabled={isLoadingCadastro}
                  onClick={handleContinue}
                  type='submit'
                  loading={isLoadingCadastro}
                />

                <Divider variant='middle' />

                <Box display='flex' justifyContent='center' alignItems='center' gap={2} >
                  <Typography fontSize={14}>Já possui uma conta?</Typography>

                  <Button
                    label='Login'
                    variant='text'
                    size='small'
                    onClick={handleClickCadastroLogin}
                  />
                </Box>
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Form>
  );
};