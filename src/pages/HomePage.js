import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  Pool as PoolIcon,
  Token as TokenIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const features = [
  {
    title: 'Pool Analytics',
    description: 'Track and analyze DeFi pool performance, liquidity, and trading volumes.',
    icon: <PoolIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Token Metrics',
    description: 'Comprehensive token analytics including price, market cap, and trading activity.',
    icon: <TokenIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Risk Assessment',
    description: 'Evaluate protocol and token risks with our advanced risk metrics.',
    icon: <SecurityIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Protocol Insights',
    description: 'Deep dive into protocol statistics and performance metrics.',
    icon: <AnalyticsIcon fontSize="large" color="primary" />,
  },
];

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          DeFi Analytics Dashboard
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your comprehensive solution for DeFi market analysis and insights
        </Typography>
        <Typography variant="body1">
          Track pools, analyze tokens, and assess risks across multiple protocols
          with our powerful analytics platform.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Key Features
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} key={feature.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How to Use Section */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          How to Use
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Explore Pools" 
              secondary="Navigate to the Pools page to view detailed information about various DeFi pools, including liquidity, volume, and token pairs."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TokenIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Analyze Tokens" 
              secondary="Use the Token page to input any token address and view comprehensive metrics, including price history and trading activity."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Assess Risks" 
              secondary="Check the risk metrics for any token or pool to make informed investment decisions."
            />
          </ListItem>
        </List>
      </Paper>

      {/* Data Sources */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Data Sources
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform aggregates data from multiple reliable sources to provide you with accurate and up-to-date information:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Real-time Pool Data" 
              secondary="Direct integration with DeFi protocols for accurate pool metrics"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Token Information" 
              secondary="Comprehensive token data from blockchain networks"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Risk Metrics" 
              secondary="Advanced analytics based on multiple risk factors and historical data"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default HomePage;
