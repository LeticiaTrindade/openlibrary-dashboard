import { useState, useEffect } from 'react';
import { searchBooks } from '../../services/openLibraryAPI';

const useBooks = (query, page, limit, yearRange, language, sort) => {
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0); // Este deve ser o total retornado pela API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        const data = await searchBooks(query, page, limit, yearRange, language, sort); 
    
        let filteredDocs = data.docs;
        if (yearRange && yearRange.length === 2) {
          const [minYearFilter, maxYearFilter] = yearRange;
          filteredDocs = data.docs.filter(book => {
            const publishYear = book.first_publish_year;
            return publishYear >= minYearFilter && publishYear <= maxYearFilter;
          });
        }

        setBooks(filteredDocs);
    
        setNumFound(data.numFound); 

      } catch (err) {
        console.error("Erro ao carregar livros no useBooks:", err);
        setError('Erro ao carregar livros.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, page, limit, yearRange, language, sort]);

  return { books, numFound, loading, error };
};

export default useBooks;