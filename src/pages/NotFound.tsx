import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        {/* 404 Number */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
          }}
        >
          Halaman Tidak Ditemukan
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: 'text.secondary',
            maxWidth: '600px',
            mb: 2,
          }}
        >
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau tidak ada.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            size="large"
            sx={{
              minWidth: { xs: '100%', sm: '180px' },
              py: 1.5,
            }}
          >
            Kembali
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
