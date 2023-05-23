import React, { useEffect, useMemo, useState } from 'react';

import { Fade, Grid, Typography, LinearProgress, useTheme } from '@mui/material';
import { Logo } from '../../../assets';

interface ISplashScreen {
  setIsLoading?: (isLoading: boolean) => void;
}

export const SplashScreen: React.FC<ISplashScreen> = ({ setIsLoading }) => {
  const theme = useTheme();

  const [progress, setProgress] = useState(0);

  const time = useMemo(() => (100), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, time);
      });
    }, time);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  useEffect(() => {
    if (progress === time) {
      setIsLoading && setIsLoading(false);
    }
  }, [progress, setIsLoading, time]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}>
      <Fade in>
        <Grid item>
          <img
            alt="Logo GVdasa"
            src={Logo}
            style={{
              width: '80px',
              position: 'relative',
              transition: 'transform .2s',
            }}
          />
        </Grid>
      </Fade>
      <Grid item>
        <Fade in>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: theme.spacing(35),
              marginTop: theme.spacing(6),
              colorPrimary: theme.palette.primary.main,
            }}
          />
        </Fade>
      </Grid>
      <Fade in>
        <Grid
          item
          sx={{ marginTop: theme.spacing(3), color: theme.palette.text.primary }}>
          <Typography variant="subtitle1">
            Carregando...
          </Typography>
        </Grid>
      </Fade>
    </Grid>
  );
};
