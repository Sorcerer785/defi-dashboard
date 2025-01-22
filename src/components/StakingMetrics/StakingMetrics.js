/* global BigInt */
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { BrowserProvider, Contract, formatUnits, isAddress, ZeroAddress } from 'ethers';

// Basic Staking Contract ABI - Adjust based on your actual staking contract
const STAKING_ABI = [
  'function totalStaked() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
  'function stakersCount() view returns (uint256)',
  'function stakingToken() view returns (address)'
];

const StakingMetrics = ({ stakingAddress, isConnected }) => {
  const [stakingData, setStakingData] = useState({
    totalStaked: 0,
    stakingAPY: 0,
    totalStakers: 0,
    averageStakingPeriod: 0,
    loading: false,
    error: null
  });

  useEffect(() => {
    const fetchStakingData = async () => {
      if (!isConnected || !stakingAddress || !isAddress(stakingAddress)) {
        return;
      }

      setStakingData(prev => ({ ...prev, loading: true, error: null }));

      try {
        const provider = new BrowserProvider(window.ethereum);
        const stakingContract = new Contract(stakingAddress, STAKING_ABI, provider);

        // Fetch staking contract data
        const [totalStaked, rewardRate, stakersCount] = await Promise.all([
          stakingContract.totalStaked().catch(() => ZeroAddress),
          stakingContract.rewardRate().catch(() => ZeroAddress),
          stakingContract.stakersCount().catch(() => ZeroAddress)
        ]);

        // Calculate APY (this is a simplified calculation)
        // In a real application, you would need to consider:
        // - Reward token price
        // - Staking token price
        // - Reward distribution period
        const yearlyRewardsBI = (BigInt(rewardRate.toString()) * BigInt(365 * 24 * 60 * 60)); // Assuming rewardRate is per second
        const totalStakedBI = BigInt(totalStaked.toString());
        const apy = totalStakedBI !== BigInt(0)
          ? Number((yearlyRewardsBI * BigInt(100)) / totalStakedBI)
          : 0;

        setStakingData({
          totalStaked: formatUnits(totalStaked, 18), // Assuming 18 decimals, adjust as needed
          stakingAPY: apy,
          totalStakers: Number(stakersCount),
          averageStakingPeriod: 30, // This would need to be calculated from actual staking data
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching staking data:', error);
        setStakingData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch staking data'
        }));
      }
    };

    fetchStakingData();
  }, [stakingAddress, isConnected]);

  if (stakingData.error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">
            {stakingData.error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Staking Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography color="textSecondary">Total Staked</Typography>
              <Typography variant="h6">
                {stakingData.loading ? 'Loading...' : `${parseFloat(stakingData.totalStaked).toFixed(2)} tokens`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography color="textSecondary">Staking APY</Typography>
              <Typography variant="h6" color={stakingData.stakingAPY > 100 ? 'warning.main' : 'primary'}>
                {stakingData.loading ? 'Loading...' : `${stakingData.stakingAPY}%`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography color="textSecondary">Total Stakers</Typography>
              <Typography variant="h6">
                {stakingData.loading ? 'Loading...' : stakingData.totalStakers}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography color="textSecondary">Avg Staking Period</Typography>
              <Typography variant="h6">
                {stakingData.loading ? 'Loading...' : `${stakingData.averageStakingPeriod} days`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StakingMetrics;
