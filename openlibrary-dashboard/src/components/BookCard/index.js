import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import imgPlaceholder from '../../assets/images/placeholder.png';
import { formatAuthors, truncateText, formatPublishYear } from '../../utils/helpers';

const BookCard = ({ book }) => {
  const { title, author_name, first_publish_year, cover_i } = book;
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : imgPlaceholder;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '180px' }}>
      <CardMedia
        component="img"
        height="250"
        image={coverUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="body2">
          <strong>Título: </strong>{truncateText(title, 50)}
        </Typography>
        <Typography variant="body2">
          <strong>Autores: </strong>{formatAuthors(author_name)}
        </Typography>
        <Typography variant="body2">
          <strong>Publicação: </strong>{formatPublishYear(first_publish_year)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
