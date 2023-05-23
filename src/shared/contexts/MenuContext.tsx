import { createContext, useCallback, useContext, useState } from 'react';

interface IMenuOption {
  icon: string;
  path: string;
  label: string;
}

interface IMenuContextData {
  isMenuOpen: boolean;
  menuOptions: IMenuOption[];
  openMenu: (event: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
  setMenuOptions: (newMenuOptions: IMenuOption[]) => void;
  anchorElProfile: HTMLElement | null;
}

const MenuContext = createContext({} as IMenuContextData);

export const useMenuContext = () => {
  return useContext(MenuContext);
};

type Props = {
  children?: React.ReactNode,
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [menuOptions, setMenuOptions] = useState<IMenuOption[]>([]);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorElProfile);

  const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorElProfile(null);
  }, []);

  const handleSetMenuOptions = useCallback((newMenuOptions: IMenuOption[]) => {
    setMenuOptions(newMenuOptions);
  }, []);

  return (
    <MenuContext.Provider value={{ setMenuOptions: handleSetMenuOptions, menuOptions, isMenuOpen, openMenu, closeMenu, anchorElProfile }}>
      {children}
    </MenuContext.Provider>
  );
};
