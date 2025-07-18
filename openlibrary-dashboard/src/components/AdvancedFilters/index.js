import React from 'react';
import { Box, Slider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const AdvancedFilters = ({ yearRange, setYearRange, language, setLanguage, sort, setSort, minYear, maxYear, setManualYearRange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
      {/* Slider de Ano */}
      <Box sx={{ width: 220 }}>
        <InputLabel sx={{ mb: 1 }}>Ano de Publicação</InputLabel>
        <Slider
          value={yearRange}
          onChange={(e, newValue) => {
            setYearRange(newValue);
            setManualYearRange(true);
          }}
          valueLabelDisplay="auto"
          min={minYear}
          max={maxYear}
          marks={[
            { value: minYear, label: `${minYear}` },
            { value: maxYear, label: `${maxYear}` },
          ]}
        />
      </Box>


      {/* Filtro de Idioma */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Idioma</InputLabel>
        <Select
          value={language}
          label="Idioma"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="eng">Inglês</MenuItem>
          <MenuItem value="por">Português</MenuItem>
          <MenuItem value="spa">Espanhol</MenuItem>
          <MenuItem value="fre">Francês</MenuItem>
        </Select>
      </FormControl>

      {/* Ordenação */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select
          value={sort}
          label="Ordenar por"
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="">Relevância</MenuItem>
          <MenuItem value="new">Mais novos</MenuItem>
          <MenuItem value="old">Mais antigos</MenuItem>
          <MenuItem value="title">Título (A-Z)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AdvancedFilters;