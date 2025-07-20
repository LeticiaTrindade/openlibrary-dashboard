import React, { useState, useEffect, useMemo } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BookCard from '../components/BookCard/index.js';
import Loading from '../components/Loading/index.js';
import useBooks from '../hooks/useBooks/index.js';
import BookModal from '../components/BookModal/index.js';
import SearchBar from '../components/SearchBar/index.js';
import Pagination from '../components/Pagination/index.js';
import useDebounce from '../hooks/useDebounce/index.js';
import AdvancedFilters from '../components/AdvancedFilters/index.js';
import { sortBooks } from '../utils/helpers.js';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const debouncedQuery = useDebounce(input.trim(), 500);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const initialMinYear = useMemo(() => 1800, []); 
  const initialMaxYear = useMemo(() => new Date().getFullYear(), []); 
  const [minYear, setMinYear] = useState(initialMinYear);
  const [maxYear, setMaxYear] = useState(initialMaxYear); 
  const [yearRange, setYearRange] = useState([initialMinYear, initialMaxYear]);
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('');
  const [manualYearRange, setManualYearRange] = useState(false);
  const query = debouncedQuery === '' ? null : debouncedQuery;

  useEffect(() => {
    setPage(1);
    setManualYearRange(false);
    setYearRange([initialMinYear, initialMaxYear]);
    setMinYear(initialMinYear);
    setMaxYear(initialMaxYear);
  }, [query, language, sort, initialMinYear, initialMaxYear]);

  const { books, loading, error, numFound } = useBooks(
    query,
    page,
    limit,
    yearRange,
    language,
    sort
  );

  const sortedBooks = sortBooks(books, sort);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const lastPage = Math.ceil(numFound / limit) || 1;
  useEffect(() => { 
    if (manualYearRange) {
      return; 
    }

    if (books && books.length > 0) {
      const years = books
        .map(book => book.first_publish_year)
        .filter(year => year != null);

      if (years.length > 0) {
        const currentMinYearOfResults = Math.min(...years);
        const currentMaxYearOfResults = Math.max(...years);

        setMinYear(currentMinYearOfResults);
        setMaxYear(currentMaxYearOfResults);

        const [currentSelectedMin, currentSelectedMax] = yearRange;
        if (currentSelectedMin < currentMinYearOfResults || currentSelectedMax > currentMaxYearOfResults) {
             setYearRange([currentMinYearOfResults, currentMaxYearOfResults]);
        }
        
      } else {
        setMinYear(initialMinYear);
        setMaxYear(initialMaxYear);
        setYearRange([initialMinYear, initialMaxYear]);
      }
    } else if (query === null) {
        setMinYear(initialMinYear);
        setMaxYear(initialMaxYear);
        setYearRange([initialMinYear, initialMaxYear]);
    }
  }, [books, query, manualYearRange, initialMinYear, initialMaxYear, yearRange]); // Adicionado yearRange aqui também

  return (
    <Container sx={{ mt: 4, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Livros - OpenLibrary
      </Typography>

      <SearchBar input={input} setInput={setInput} />

      <AdvancedFilters
        yearRange={yearRange}
        setYearRange={setYearRange}
        language={language}
        setLanguage={setLanguage}
        sort={sort}
        setSort={setSort}
        minYear={minYear} 
        maxYear={maxYear} 
        setManualYearRange={setManualYearRange} 
      />

      {query === null && (
        <Typography align="center">Digite um termo para pesquisar um livro.</Typography>
      )}

      {loading && <Loading />}

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && sortedBooks.length === 0 && query !== null && (
        <Typography align="center">Nenhum livro encontrado.</Typography>
      )}

      <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ flexGrow: 1 }}>
        {sortedBooks.map((book) => (
          <Grid
            item
            key={book.key}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleCardClick(book)}
          >
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        query={query}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
        numFound={numFound}
      />

      <BookModal open={modalOpen} onClose={handleModalClose} book={selectedBook} />
    </Container>
  );
};

export default Dashboard;