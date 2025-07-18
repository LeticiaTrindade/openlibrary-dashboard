import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <CircularProgress />
    <Typography sx={{ ml: 2 }}>Carregando...</Typography>
  </Box>
);

export default Loading;
