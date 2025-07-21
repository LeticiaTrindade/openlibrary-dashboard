import React, { useState, useEffect, useMemo } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import useBooks from '../hooks/useBooks';
import BookModal from '../components/BookModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';
import AdvancedFilters from '../components/AdvancedFilters';
import BookCharts from '../components/BookCharts';
import { sortBooks } from '../utils/helpers';

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
    const fetchYears = async () => {
      if (!query) {
        setMinYear(initialMinYear);
        setMaxYear(initialMaxYear);
        setYearRange([initialMinYear, initialMaxYear]);
        return;
      }

      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=50`);
        const data = await response.json();
        const years = data.docs
          .map(book => book.first_publish_year)
          .filter(year => year != null);
        if (years.length > 0) {
          const currentMinYear = Math.min(...years);
          const currentMaxYear = Math.max(...years);
          setMinYear(currentMinYear);
          setMaxYear(currentMaxYear);
          setYearRange([currentMinYear, currentMaxYear]);
        } else {
          setMinYear(initialMinYear);
          setMaxYear(initialMaxYear);
          setYearRange([initialMinYear, initialMaxYear]);
        }
      } catch (error) {
        console.error('Erro ao buscar anos:', error);
        setMinYear(initialMinYear);
        setMaxYear(initialMaxYear);
        setYearRange([initialMinYear, initialMaxYear]);
      }
    };

    setPage(1);
    setManualYearRange(false);
    fetchYears();
  }, [query]);

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
        {sortedBooks.slice(0,5).map((book) => (
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

      {books.length > 0 && (
        <Box sx={{ my: 4, width: '100%', bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Visualização de Dados dos Livros Encontrados
          </Typography>
          <BookCharts books={books} />
        </Box>
      )}

      <BookModal open={modalOpen} onClose={handleModalClose} book={selectedBook} />
    </Container>
  );
};

export default Dashboard;
