import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BookCard from '../components/BookCard/index.js';
import Loading from '../components/Loading/index.js';
import useBooks from '../hooks/useBooks/index.js';
import BookModal from '../components/BookModal/index.js';
import SearchBar from '../components/SearchBar/index.js';
import Pagination from '../components/Pagination/index.js';
import Footer from '../components/Footer/index.js';
import useDebounce from '../hooks/useDebounce/index.js';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const debouncedQuery = useDebounce(input.trim(), 500); // debounce aqui
  const [page, setPage] = useState(1);
  const limit = 12;
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const query = debouncedQuery === '' ? null : debouncedQuery;

  React.useEffect(() => {
    setPage(1);
  }, [query]);

  const { books, loading, error, numFound } = useBooks(query, page, limit);

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

      {query === null && (
        <Typography align="center">Digite um termo para pesquisar um livro.</Typography>
      )}

      {loading && <Loading />}

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && books.length === 0 && query !== null && (
        <Typography align="center">Nenhum livro encontrado.</Typography>
      )}

      <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ flexGrow: 1 }}>
        {books.map((book) => (
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
