import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { format, subDays } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const generateHistoricalData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
    value: Math.random() * 5,
  }));
};

const getScoreColor = (score) => {
  if (score >= 4) return '#4caf50';
  if (score >= 2.5) return '#ff9800';
  return '#f44336';
};

const ScoreDetailsModal = ({ open, onClose, type, score }) => {
  const historicalData = generateHistoricalData();

  const lineChartData = {
    labels: historicalData.map(d => d.date),
    datasets: [
      {
        label: `${type} Score History`,
        data: historicalData.map(d => d.value),
        borderColor: getScoreColor(score),
        backgroundColor: getScoreColor(score) + '20',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${type} Score Trend (Last 30 Days)`,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
      },
    },
  };

  const doughnutData = {
    labels: ['Current Score', 'Remaining'],
    datasets: [
      {
        data: [score, 5 - score],
        backgroundColor: [getScoreColor(score), '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const getScoreDetails = () => {
    switch (type) {
      case 'Security':
        return {
          title: 'Security Score Analysis',
          factors: [
            { text: 'Smart Contract Audit Status', status: score >= 4 },
            { text: 'Code Verification', status: score >= 3.5 },
            { text: 'Owner Privileges', status: score >= 3 },
            { text: 'Security Incidents History', status: score >= 2.5 },
          ],
          description: 'Security score evaluates the overall safety and reliability of the token contract.',
        };
      case 'Liquidity':
        return {
          title: 'Liquidity Score Analysis',
          factors: [
            { text: 'Total Value Locked (TVL)', status: score >= 4 },
            { text: 'Trading Volume', status: score >= 3.5 },
            { text: 'Market Depth', status: score >= 3 },
            { text: 'Liquidity Provider Count', status: score >= 2.5 },
          ],
          description: 'Liquidity score indicates how easily the token can be bought or sold without causing a significant price impact.',
        };
      case 'Volatility':
        return {
          title: 'Volatility Score Analysis',
          factors: [
            { text: 'Price Stability', status: score >= 4 },
            { text: 'Trading Range', status: score >= 3.5 },
            { text: 'Price Impact', status: score >= 3 },
            { text: 'Historical Volatility', status: score >= 2.5 },
          ],
          description: 'Volatility score measures the price stability and predictability of the token.',
        };
      default:
        return {
          title: '',
          factors: [],
          description: '',
        };
    }
  };

  const details = getScoreDetails();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {details.title}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Score Overview */}
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" paragraph>
              {details.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={8}>
            <Box sx={{ height: 300, mb: 4 }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Box>
          </Grid>

          {/* Current Score */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <Typography
                variant="h4"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: getScoreColor(score),
                }}
              >
                {score.toFixed(1)}
              </Typography>
            </Box>
          </Grid>

          {/* Factors List */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Key Factors
            </Typography>
            <List>
              {details.factors.map((factor, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {factor.status ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <WarningIcon color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={factor.text} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreDetailsModal;
