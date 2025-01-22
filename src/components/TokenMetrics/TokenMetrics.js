import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Skeleton } from '@mui/material';
import { BrowserProvider, Contract, formatUnits, isAddress } from 'ethers';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// Basic ERC20 ABI for getting token information
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)'
];

const TokenMetrics = ({ tokenAddress, isConnected }) => {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    price: 0,
    marketCap: 0,
    volume24h: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!isConnected || !tokenAddress || !isAddress(tokenAddress)) {
        return;
      }

      try {
        // Connect to Ethereum network
        const provider = new BrowserProvider(window.ethereum);
        const tokenContract = new Contract(tokenAddress, ERC20_ABI, provider);

        // Fetch basic token information
        const [name, symbol, decimals] = await Promise.all([
          tokenContract.name(),
          tokenContract.symbol(),
          tokenContract.decimals()
        ]);

        // Generate deterministic values based on token address
        const addressSum = tokenAddress
          .toLowerCase()
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        // Generate consistent price and volume based on address
        const basePrice = ((addressSum % 1000) / 10) + 0.1; // Price between $0.1 and $100
        const baseVolume = ((addressSum * 17) % 10000) * 1000; // Volume between 0 and 10M

        setTokenData({
          name,
          symbol,
          price: basePrice.toFixed(2),
          marketCap: (basePrice * 1000000).toFixed(2), // Using a fixed supply for market cap
          volume24h: baseVolume.toFixed(2)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setTokenData({
          name: 'Error',
          symbol: 'ERR',
          price: 0,
          marketCap: 0,
          volume24h: 0
        });
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [tokenAddress, isConnected]);

  const MetricCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ position: 'absolute', top: -20, left: 20, backgroundColor: color, borderRadius: '50%', p: 2, boxShadow: 3 }}>
          {icon}
        </Box>
        <Box sx={{ pt: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            {title}
          </Typography>
          {loading ? (
            <Skeleton variant="text" width="80%" height={40} />
          ) : (
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Token Metrics {tokenData.name && `- ${tokenData.name} (${tokenData.symbol})`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Price"
            value={`$${tokenData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<MonetizationOnIcon sx={{ color: 'white' }} />}
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Market Cap"
            value={`$${tokenData.marketCap.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ color: 'white' }} />}
            color="#f50057"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="24h Volume"
            value={`$${tokenData.volume24h.toLocaleString()}`}
            icon={<ShowChartIcon sx={{ color: 'white' }} />}
            color="#4caf50"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenMetrics;
