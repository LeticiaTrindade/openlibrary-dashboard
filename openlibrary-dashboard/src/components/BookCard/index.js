// src/components/BookCard/BookCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import imgPlaceholder from '../../assets/images/placeholder.png';

const BookCard = ({ book }) => {
  const { title, author_name, first_publish_year, cover_i } = book;
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : imgPlaceholder;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' , maxWidth: '180px'}}>
      <CardMedia
        component="img"
        height="250"
        image={coverUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {author_name ? author_name.join(', ') : 'Autor desconhecido'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {first_publish_year || 'Ano desconhecido'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
