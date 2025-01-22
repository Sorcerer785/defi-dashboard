import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  Fade,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import { fetchSupportedProtocols } from '../../services/api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const blockchainColors = {
  ethereum: '#627EEA',
  polygon: '#8247E5',
  avalanche: '#E84142',
  linea: '#32CD32',
  default: '#666666'
};

const blockchainDescriptions = {
  ethereum: 'Ethereum is a decentralized blockchain platform that enables smart contracts and DApps.',
  polygon: 'Polygon is a Layer 2 scaling solution that enables fast, low-cost transactions.',
  avalanche: 'Avalanche is a high-performance, scalable blockchain platform for DeFi applications.',
  linea: 'Linea is a zkRollup solution designed for scalable and secure blockchain transactions.',
  default: 'Blockchain platform for decentralized applications.'
};

const TOTAL_ITEMS = 100;

const SupportedProtocols = () => {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchSupportedProtocols();
      
      if (!response || !response.data) {
        throw new Error('Invalid response format');
      }
      
      // Filter out protocols with empty names and limit to first 100
      const validProtocols = response.data
        .filter(p => p.protocol && p.protocol.trim() !== '')
        .slice(0, TOTAL_ITEMS);
        
      setProtocols(validProtocols);
      setError(null);
    } catch (err) {
      setError('Failed to fetch supported protocols');
      setProtocols([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        sx={{
          background: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1]
        }}
      >
        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        p={4} 
        sx={{
          background: theme.palette.error.light,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.error.contrastText
        }}
      >
        <Typography variant="h6" component="div">
          Error Loading Protocols
        </Typography>
        <Typography color="inherit">
          {error}
        </Typography>
      </Box>
    );
  }

  // Group valid protocols by blockchain
  const groupedProtocols = protocols.reduce((acc, protocol) => {
    const blockchain = protocol.blockchain?.toLowerCase() || 'unknown';
    if (!acc[blockchain]) {
      acc[blockchain] = [];
    }
    acc[blockchain].push(protocol);
    return acc;
  }, {});

  return (
    <Fade in timeout={1000}>
      <Paper 
        sx={{ 
          width: '100%', 
          p: 4, 
          mt: 3,
          background: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2]
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            mb: 3,
            color: theme.palette.text.primary
          }}
        >
          Supported Protocols by Blockchain
        </Typography>
        
        {Object.keys(groupedProtocols).length === 0 ? (
          <Typography 
            color="text.secondary" 
            sx={{ 
              p: 3,
              textAlign: 'center',
              bgcolor: theme.palette.action.hover,
              borderRadius: theme.shape.borderRadius
            }}
          >
            No protocols available
          </Typography>
        ) : (
          Object.entries(groupedProtocols).map(([blockchain, protocols]) => (
            <Fade in timeout={800} key={blockchain}>
              <Box 
                mb={4}
                sx={{
                  '&:last-child': { mb: 0 }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Chip 
                    label={blockchain}
                    sx={{ 
                      backgroundColor: blockchainColors[blockchain] || blockchainColors.default,
                      color: 'white',
                      mr: 1,
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      px: 1
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      color: theme.palette.text.primary
                    }}
                  >
                    {protocols.length} Protocol{protocols.length !== 1 ? 's' : ''}
                  </Typography>
                  <Tooltip title={blockchainDescriptions[blockchain] || blockchainDescriptions.default}>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Grid container spacing={2}>
                  {protocols.map((protocol, index) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={4} 
                      lg={3} 
                      key={`${protocol.blockchain}-${protocol.protocol}-${index}`}
                    >
                      <Card 
                        variant="outlined"
                        sx={{
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[4],
                            borderColor: blockchainColors[blockchain] || blockchainColors.default
                          }
                        }}
                      >
                        <CardContent>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              textTransform: 'capitalize',
                              fontWeight: 500,
                              color: theme.palette.text.primary,
                              letterSpacing: '0.015em'
                            }}
                          >
                            {protocol.protocol}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          ))
        )}
      </Paper>
    </Fade>
  );
};

export default SupportedProtocols;
