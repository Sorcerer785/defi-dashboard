import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Box,
  Rating,
  Chip,
  IconButton,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ScoreDetailsModal from './ScoreDetailsModal';

const RiskAnalytics = ({ tokenAddress, isConnected }) => {
  const [riskData, setRiskData] = useState({
    securityScore: 0,
    liquidityScore: 0,
    volatilityScore: 0,
    loading: false,
    error: null
  });

  const [modalConfig, setModalConfig] = useState({
    open: false,
    type: '',
    score: 0,
  });

  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  useEffect(() => {
    const analyzeRisk = async () => {
      if (!isConnected) return;
      
      if (!tokenAddress || !isValidAddress(tokenAddress)) {
        setRiskData({
          securityScore: 0,
          liquidityScore: 0,
          volatilityScore: 0,
          loading: false,
          error: tokenAddress ? 'Invalid token address' : null
        });
        return;
      }

      setRiskData(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Generate deterministic scores based on token address
        const addressSum = tokenAddress
          .toLowerCase()
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        // Use the address sum to generate scores between 1 and 5
        const mockAnalysis = {
          securityScore: ((addressSum % 40) / 10) + 1, // Score between 1-5
          liquidityScore: (((addressSum * 7) % 40) / 10) + 1, // Different pattern
          volatilityScore: (((addressSum * 13) % 40) / 10) + 1, // Different pattern
        };

        setRiskData({
          ...mockAnalysis,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error analyzing risk:', error);
        setRiskData({
          securityScore: 0,
          liquidityScore: 0,
          volatilityScore: 0,
          loading: false,
          error: 'Failed to analyze risk'
        });
      }
    };

    analyzeRisk();
  }, [tokenAddress, isConnected]);

  const getRiskLevel = (score) => {
    if (score >= 4) return { label: 'Low Risk', color: 'success' };
    if (score >= 2.5) return { label: 'Medium Risk', color: 'warning' };
    return { label: 'High Risk', color: 'error' };
  };

  const handleOpenModal = (type, score) => {
    setModalConfig({
      open: true,
      type,
      score,
    });
  };

  const handleCloseModal = () => {
    setModalConfig({
      open: false,
      type: '',
      score: 0,
    });
  };

  const MetricCard = ({ title, score, icon }) => {
    const risk = getRiskLevel(score);
    
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
            <IconButton 
              size="small" 
              sx={{ ml: 'auto' }}
              onClick={() => handleOpenModal(title, score)}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={score} 
              precision={0.5} 
              readOnly 
              sx={{ mr: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              {score.toFixed(1)}/5.0
            </Typography>
          </Box>

          <Chip 
            label={risk.label}
            color={risk.color}
            size="small"
          />
        </CardContent>
      </Card>
    );
  };

  if (riskData.loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (riskData.error) {
    return (
      <Typography color="error">
        {riskData.error}
      </Typography>
    );
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Please connect your wallet to view risk analytics
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Security"
            score={riskData.securityScore}
            icon={<SecurityIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Liquidity"
            score={riskData.liquidityScore}
            icon={<AssessmentIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Volatility"
            score={riskData.volatilityScore}
            icon={<TimelineIcon color="primary" />}
          />
        </Grid>
      </Grid>

      <ScoreDetailsModal
        open={modalConfig.open}
        onClose={handleCloseModal}
        type={modalConfig.type}
        score={modalConfig.score}
      />
    </>
  );
};

export default RiskAnalytics;
