const API_KEY = process.env.REACT_APP_X_API_KEY;
const BASE_URL = 'https://api.unleashnfts.com/api/v2';

export const fetchDefiPoolMetrics = async (offset = 0, limit = 30) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  };

  try {
    const response = await fetch(
      `${BASE_URL}/defi/pool/metrics?offset=${offset}&limit=${limit}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch pool metrics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pool metrics:', error);
    throw error;
  }
};

export const fetchDefiProtocolPools = async (offset = 0, limit = 30) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  };

  try {
    const response = await fetch(
      `${BASE_URL}/defi/pool?offset=${offset}&limit=${limit}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch protocol pools');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching protocol pools:', error);
    throw error;
  }
};

export const fetchSupportedProtocols = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  };

  try {
    const response = await fetch(
      `${BASE_URL}/defi/pool/supported_protocols?offset=0&limit=100`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch supported protocols');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching supported protocols:', error);
    throw error;
  }
};

export const fetchDefiPoolMetadata = async (offset = 0, limit = 30) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  };

  try {
    const response = await fetch(
      `${BASE_URL}/defi/pool/metadata?offset=${offset}&limit=${limit}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch pool metadata');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pool metadata:', error);
    throw error;
  }
};
