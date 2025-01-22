import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Grid, 
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Tooltip,
  Container
} from '@mui/material';
import TokenMetrics from '../components/TokenMetrics/TokenMetrics';
import RiskAnalytics from '../components/RiskAnalytics/RiskAnalytics';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Sample token addresses with names
const SAMPLE_TOKENS = [
  {
    name: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    description: 'Tether USD'
  },
  {
    name: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    description: 'USD Coin'
  },
  {
    name: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    description: 'Wrapped Ether'
  },
  {
    name: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    description: 'Uniswap'
  },
  {
    name: 'LINK',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    description: 'Chainlink'
  }
];

const RECENT_ADDRESSES_KEY = 'recentTokenAddresses';
const MAX_RECENT_ADDRESSES = 3;

const TokenPage = ({ isConnected }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recentAddresses, setRecentAddresses] = useState([]);

  useEffect(() => {
    const savedAddresses = localStorage.getItem(RECENT_ADDRESSES_KEY);
    if (savedAddresses) {
      setRecentAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const updateRecentAddresses = (address) => {
    if (!address) return;

    const updatedRecent = [
      { address, timestamp: Date.now() },
      ...recentAddresses.filter(item => item.address !== address)
    ].slice(0, MAX_RECENT_ADDRESSES);

    setRecentAddresses(updatedRecent);
    localStorage.setItem(RECENT_ADDRESSES_KEY, JSON.stringify(updatedRecent));
  };

  const handleAddressClick = (address) => {
    setTokenAddress(address);
    updateRecentAddresses(address);
  };

  const handleManualInput = (event) => {
    const address = event.target.value;
    setTokenAddress(address);
    
    if (address.length === 42) {
      updateRecentAddresses(address);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            {/* Token Input */}
            <TextField
              fullWidth
              label="Token Address"
              variant="outlined"
              value={tokenAddress}
              onChange={handleManualInput}
              sx={{ mb: 3, bgcolor: 'background.paper' }}
            />

            {/* Sample Tokens */}
            <Typography variant="subtitle1" gutterBottom>
              Sample Tokens
            </Typography>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {SAMPLE_TOKENS.map((token) => (
                <Tooltip key={token.address} title={token.description} arrow>
                  <Button
                    fullWidth
                    variant={tokenAddress === token.address ? "contained" : "outlined"}
                    onClick={() => handleAddressClick(token.address)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body1">{token.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`${token.address.slice(0, 6)}...${token.address.slice(-4)}`}
                      </Typography>
                    </Box>
                  </Button>
                </Tooltip>
              ))}
            </Stack>

            {/* Recent Addresses */}
            {recentAddresses.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Addresses
                </Typography>
                <Stack spacing={1}>
                  {recentAddresses.map(({ address, timestamp }) => {
                    const matchingSample = SAMPLE_TOKENS.find(token => 
                      token.address.toLowerCase() === address.toLowerCase()
                    );
                    
                    return (
                      <Button
                        key={`${address}-${timestamp}`}
                        variant="outlined"
                        onClick={() => handleAddressClick(address)}
                        fullWidth
                        sx={{ 
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          py: 1
                        }}
                        startIcon={<ContentCopyIcon />}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Typography variant="body2">
                            {matchingSample ? matchingSample.name : `${address.slice(0, 6)}...${address.slice(-4)}`}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Button>
                    );
                  })}
                </Stack>
              </>
            )}
          </Paper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {/* Token Metrics - Top */}
            <Grid item xs={12}>
              <TokenMetrics tokenAddress={tokenAddress} isConnected={isConnected} />
            </Grid>

            {/* Risk Analytics - Bottom */}
            <Grid item xs={12}>
              <RiskAnalytics 
                tokenAddress={tokenAddress}
                isConnected={isConnected} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TokenPage;
