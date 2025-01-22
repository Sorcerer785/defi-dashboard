import React, { useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Alert, 
  IconButton,
  useTheme,
  CssBaseline,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider } from './theme/ThemeContext';
import { useTheme as useCustomTheme } from './theme/ThemeContext';
import Layout from './components/Layout/Layout';
import TokenPage from './pages/TokenPage';
import PoolsPage from './pages/PoolsPage';
import ProtocolsPage from './pages/ProtocolsPage';
import HomePage from './pages/HomePage';

function AppContent() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const { toggleColorMode, mode } = useCustomTheme();

  useEffect(() => {
    checkConnection();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    setIsConnected(accounts.length > 0);
  };

  const checkConnection = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to use this dApp');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setIsConnected(accounts.length > 0);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    } catch (err) {
      console.error('Error checking connection:', err);
      setError('Failed to connect to MetaMask');
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to use this dApp');
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
      setError('');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DeFi Analytics
          </Typography>
          <IconButton 
            sx={{ mr: 2 }} 
            onClick={toggleColorMode} 
            color="inherit"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button 
            color="inherit" 
            startIcon={<AccountBalanceWalletIcon />}
            onClick={connectWallet}
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </Toolbar>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pools" element={<PoolsPage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
            <Route path="/tokens" element={<TokenPage isConnected={isConnected} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
