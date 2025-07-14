import { Dialog, DialogTitle, DialogContent, Typography, Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import imgPlaceholder from '../../assets/images/placeholder.png';

const BookModal = ({ open, onClose, book }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : imgPlaceholder;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction={isSmallScreen ? 'column' : 'row'}
          alignItems={isSmallScreen ? 'center' : 'flex-start'}
        >
          <Grid item>
            <Box
              component="img"
              src={coverUrl}
              alt={book.title}
              sx={{
                width: 180,
                height: 'auto',
                borderRadius: 1,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom>
              <strong>Autores:</strong> {book.author_name?.join(', ') || 'Desconhecido'}
            </Typography>
            <Typography gutterBottom>
              <strong>Ano de publicação:</strong> {book.first_publish_year || 'N/A'}
            </Typography>
            <Typography gutterBottom>
              <strong>Número de páginas:</strong> {book.number_of_pages_median || 'N/A'}
            </Typography>
            <Typography gutterBottom>
              <strong>Editora:</strong> {book.publisher ? book.publisher.join(', ') : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;
