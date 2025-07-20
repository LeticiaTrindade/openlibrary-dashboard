import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Pagination = ({ query, page, setPage, lastPage, numFound }) => {
  if (query === null) return null;

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography>
        Página: {page} de {lastPage} | Total encontrado: {numFound}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button variant="outlined" disabled={page === 1} onClick={() => setPage(1)}>
          Primeira
        </Button>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </Button>
        <Button
          variant="outlined"
          disabled={page === lastPage}
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
        >
          Próxima
        </Button>
        <Button
          variant="outlined"
          disabled={page === lastPage}
          onClick={() => setPage(lastPage)}
        >
          Última
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
