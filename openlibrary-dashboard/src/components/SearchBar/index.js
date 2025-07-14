import React from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ input, setInput }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        label="Pesquisar livros"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
