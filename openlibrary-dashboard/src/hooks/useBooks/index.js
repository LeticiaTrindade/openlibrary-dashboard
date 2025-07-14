// src/hooks/useBooks.jsx
import { useState, useEffect } from 'react';
import { searchBooks } from '../../services/openLibraryAPI';

const useBooks = (query, page, limit) => {
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false); // inicia como false
  const [error, setError] = useState(null);

  useEffect(() => {
    // não busca se query for null
    if (query === null) {
      setBooks([]);
      setNumFound(0);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchBooks(query, page, limit);
        setBooks(data.docs);
        setNumFound(data.numFound);
      } catch (err) {
        setError('Erro ao carregar livros.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, page, limit]);

  return { books, numFound, loading, error };
};

export default useBooks;
  