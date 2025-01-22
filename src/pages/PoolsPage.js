import React from 'react';
import { Grid } from '@mui/material';
import PoolMetricsData from '../components/PoolMetricsData/PoolMetricsData';
import ProtocolPools from '../components/ProtocolPools/ProtocolPools';

const PoolsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PoolMetricsData />
      </Grid>

      <Grid item xs={12}>
        <ProtocolPools />
      </Grid>
    </Grid>
  );
};

export default PoolsPage;
