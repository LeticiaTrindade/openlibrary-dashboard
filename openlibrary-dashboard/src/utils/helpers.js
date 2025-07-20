export const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return 'Autor desconhecido';
  return authors.join(', ');
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatPublishYear = (year) => {
  if (!year) return 'Ano desconhecido';
  return year.toString();
};

export const sortBooksByTitle = (books) => {
  if (!books || books.length === 0) return [];
  return [...books].sort((a, b) => {
    const titleA = a.title ? a.title.toLowerCase() : '';
    const titleB = b.title ? b.title.toLowerCase() : '';
    return titleA.localeCompare(titleB);
  });
};


export const sortBooks = (books, sort) => {
  if (!books || books.length === 0) return [];

  if (sort === 'new') {
    return [...books].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
  } else if (sort === 'old') {
    return [...books].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
  } else if (sort === 'title') {
    return [...books].sort((a, b) => {
      const titleA = a.title ? a.title.toLowerCase() : '';
      const titleB = b.title ? b.title.toLowerCase() : '';
      return titleA.localeCompare(titleB);
    });
  }

  return books;
};