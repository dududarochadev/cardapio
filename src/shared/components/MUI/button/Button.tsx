import React from 'react';

import { Button as MuiButton, ButtonProps, CircularProgress } from '@mui/material';

type TButtonProps = ButtonProps & {
  label?: string;
  loading?: boolean;
  minWidth?: number;
  borderRounded?: boolean;
  children?: React.ReactNode | string;
}

export const Button: React.FC<TButtonProps> = ({
  label,
  loading = false,
  minWidth = 120,
  borderRounded = true,
  children,
  ...rest }) => {

  return (
    <MuiButton
      {...rest}
      sx={Object.assign({}, rest.sx, { borderRadius: borderRounded ? 28 : 0, minWidth: minWidth })}
    >
      {
        loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          children ?? label
        )
      }
    </MuiButton >
  );
};
