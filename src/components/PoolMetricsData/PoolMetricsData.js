import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Alert,
  Tooltip,
  Snackbar
} from '@mui/material';
import { fetchDefiPoolMetrics } from '../../services/api';

const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const PoolMetricsData = () => {
  const [poolData, setPoolData] = useState({
    pools: [],
    pagination: null,
    loading: true,
    error: null
  });
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
  const ITEMS_PER_PAGE = 10;
  const TOTAL_ITEMS = 100;

  const handleCopyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setSnackbar({
        open: true,
        message: 'Address copied to clipboard!'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to copy address'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const fetchPools = async () => {
    try {
      setPoolData(prev => ({ ...prev, loading: true }));
      const response = await fetchDefiPoolMetrics((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
      
      // Only take first 100 entries
      const limitedData = {
        ...response,
        data: response.data.slice(0, TOTAL_ITEMS - ((page - 1) * ITEMS_PER_PAGE)),
        pagination: {
          ...response.pagination,
          total_items: TOTAL_ITEMS
        }
      };

      setPoolData({
        pools: limitedData.data,
        pagination: limitedData.pagination,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching pool metrics:', error);
      setPoolData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch pool metrics'
      }));
    }
  };

  useEffect(() => {
    // Only fetch if we're within the first 100 items
    if ((page - 1) * ITEMS_PER_PAGE < TOTAL_ITEMS) {
      fetchPools();
    }
  }, [page]);

  const formatValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      if (value < 0.00001) return '< 0.00001';
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
    return value;
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return '-';
    return `${(value * 100).toFixed(2)}%`;
  };

  if (poolData.error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {poolData.error}
      </Alert>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            DeFi Pool Performance
          </Typography>
          {poolData.loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pool Address</TableCell>
                      <TableCell>Chain</TableCell>
                      <TableCell>Total TVL ($)</TableCell>
                      <TableCell>24h Volume ($)</TableCell>
                      <TableCell>24h Volume Change</TableCell>
                      <TableCell>24h Transactions</TableCell>
                      <TableCell>All Time Volume ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {poolData.pools.map((pool) => (
                      <TableRow key={pool.pair_address} hover>
                        <TableCell>
                          <Tooltip 
                            title="Click to copy address"
                            arrow
                            placement="top"
                            sx={{
                              backgroundColor: 'background.paper',
                              '& .MuiTooltip-tooltip': {
                                fontSize: '0.875rem',
                                padding: '8px 12px',
                                backgroundColor: '#132f4c',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '4px',
                              },
                            }}
                          >
                            <Box 
                              component="span" 
                              onClick={() => handleCopyAddress(pool.pair_address)}
                              sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                  color: 'primary.main',
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              {truncateAddress(pool.pair_address)}
                            </Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {pool.blockchain}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatValue(pool.total_tvl)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatValue(pool.volume_24hrs)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2"
                            color={pool.volume_24hrs_change > 0 ? 'success.main' : 'error.main'}
                          >
                            {pool.volume_24hrs_change ? formatPercentage(pool.volume_24hrs_change) : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatValue(pool.transactions_24hrs)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatValue(pool.volume_all)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {poolData.pagination && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={Math.ceil(poolData.pagination.total_items / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={(event, newPage) => setPage(newPage)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default PoolMetricsData;
