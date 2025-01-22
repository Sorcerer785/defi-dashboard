import React from 'react';
import { Grid } from '@mui/material';
import SupportedProtocols from '../components/SupportedProtocols/SupportedProtocols';

const ProtocolsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SupportedProtocols />
      </Grid>
    </Grid>
  );
};

export default ProtocolsPage;
