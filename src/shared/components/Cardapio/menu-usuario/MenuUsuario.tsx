import { Avatar, Box, Button, Icon, List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useCallback } from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import { useMenuContext } from '../../../contexts';
import { servicoDeAutenticacao } from '../../../services/api/auth/servicoDeAutenticacao';
import { useQuery } from '@tanstack/react-query';

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuUsuario: React.FC = () => {
  const { isMenuOpen, openMenu, closeMenu, menuOptions, anchorElProfile } = useMenuContext();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const { logout } = useUserContext();

  return (
    <>
      <Button
        variant='text'
        sx={{ padding: 0 }}
        onClick={openMenu}
        aria-controls={isMenuOpen ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
      >
        <Box gap={1} display='flex' alignItems='center' padding={1}>
          <Avatar
            sx={{ height: theme.spacing(4), width: theme.spacing(4) }}
          >US</Avatar>
          {!lgDown && <Typography variant='button'>Olá, <strong>Usuario</strong>.</Typography>}
          <Icon>expand_more</Icon>
        </Box>
      </Button>

      <Popover
        PaperProps={{
          style: {
            marginTop: theme.spacing(2),
            width: 260
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={anchorElProfile}
        open={isMenuOpen}
        onClose={closeMenu}
      >
        <Box flex={1}>
          <List component="nav">
            {menuOptions.map(menuOption => (
              <ListItemLink
                key={menuOption.path}
                icon={menuOption.icon}
                label={menuOption.label}
                to={menuOption.path}
                onClick={closeMenu}
              />
            ))}
          </List>
        </Box>

        <Box px={2} mb={1} mt={4}>
          <Button
            variant="outlined"
            startIcon={<Icon>logout_rounded</Icon>}
            onClick={logout}
          >
            Encerrar sessão
          </Button>
        </Box>
      </Popover>
    </>
  );
};