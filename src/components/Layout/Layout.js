import React from 'react';
import { Box, Container } from '@mui/material';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
  return (
    <Box>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
