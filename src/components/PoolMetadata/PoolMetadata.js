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
  Tooltip,
  Snackbar,
  Box,
  Pagination
} from '@mui/material';
import { fetchDefiPoolMetadata } from '../../services/api';

const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const PoolMetadata = () => {
  const [metadata, setMetadata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
  const TOTAL_ITEMS = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchDefiPoolMetadata(page * rowsPerPage, rowsPerPage);
        // Only take first 100 entries
        const limitedData = response.data.slice(0, TOTAL_ITEMS - (page * rowsPerPage));
        setMetadata(limitedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch pool metadata');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we're within the first 100 items
    if (page * rowsPerPage < TOTAL_ITEMS) {
      fetchData();
    }
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>Pool Metadata</Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Protocol</TableCell>
              <TableCell>Pool</TableCell>
              <TableCell>Pair Address</TableCell>
              <TableCell>Token 0</TableCell>
              <TableCell>Token 1</TableCell>
              <TableCell>Chain</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metadata.map((row) => (
              <TableRow key={row.pair_address}>
                <TableCell>{row.protocol}</TableCell>
                <TableCell>{row.pool}</TableCell>
                <TableCell>
                  <Tooltip title="Click to copy address">
                    <Typography 
                      component="span" 
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleCopyAddress(row.pair_address)}
                    >
                      {truncateAddress(row.pair_address)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{`${row.token0_symbol} (${row.token0_name})`}</TableCell>
                <TableCell>{`${row.token1_symbol} (${row.token1_name})`}</TableCell>
                <TableCell>{row.blockchain}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(TOTAL_ITEMS / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Paper>
  );
};

export default PoolMetadata;
