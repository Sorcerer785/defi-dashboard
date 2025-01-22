import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TokenIcon from '@mui/icons-material/Token';
import PoolIcon from '@mui/icons-material/Water';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/pools') return 1;
    if (path === '/tokens') return 2;
    if (path === '/protocols') return 3;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/pools');
        break;
      case 2:
        navigate('/tokens');
        break;
      case 3:
        navigate('/protocols');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
    }}>
      <Tabs
        value={getTabValue()}
        onChange={handleTabChange}
        centered
        sx={{
          '& .MuiTab-root': {
            minWidth: 120,
            fontWeight: 500,
            fontSize: '0.875rem',
            textTransform: 'none',
            py: 2,
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
          '& .MuiTabs-indicator': {
            height: 3,
          },
        }}
      >
        <Tab 
          icon={<HomeIcon />}
          label="Home"
          iconPosition="start"
        />
        <Tab 
          icon={<PoolIcon />}
          label="Pools"
          iconPosition="start"
        />
        <Tab 
          icon={<TokenIcon />}
          label="Tokens"
          iconPosition="start"
        />
        <Tab 
          icon={<AppsIcon />}
          label="Protocols"
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
};

export default Navigation;
