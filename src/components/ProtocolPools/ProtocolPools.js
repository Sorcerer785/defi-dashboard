import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  Pagination,
  Snackbar
} from '@mui/material';
import { fetchDefiProtocolPools } from '../../services/api';

const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ProtocolPools = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
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
      setLoading(true);
      const response = await fetchDefiProtocolPools((page - 1) * rowsPerPage, rowsPerPage);
      
      // Set total items first
      setTotalItems(Math.min(response.pagination.total_items, TOTAL_ITEMS));
      
      // Calculate remaining items
      const remainingItems = TOTAL_ITEMS - ((page - 1) * rowsPerPage);
      
      // Only slice if we need to
      const limitedData = remainingItems < rowsPerPage 
        ? response.data.slice(0, remainingItems)
        : response.data;
        
      setPools(limitedData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch protocol pools');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Protocol Pools</Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Pool Address</TableCell>
              <TableCell>Protocol</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Token 0</TableCell>
              <TableCell>Token 1</TableCell>
              <TableCell>Deployed Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool) => (
              <TableRow key={pool.pair_address}>
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
                <TableCell>{pool.protocol}</TableCell>
                <TableCell>{pool.blockchain}</TableCell>
                <TableCell>
                  <Typography variant="body2">{pool.token0_symbol}</Typography>
                  <Typography variant="caption" color="textSecondary">{pool.token0_name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{pool.token1_symbol}</Typography>
                  <Typography variant="caption" color="textSecondary">{pool.token1_name}</Typography>
                </TableCell>
                <TableCell>{new Date(pool.deployed_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(totalItems / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Paper>
  );
};

export default ProtocolPools;
