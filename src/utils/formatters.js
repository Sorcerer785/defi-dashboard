/**
 * Format a number with commas and specified decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return 'N/A';
  if (value === 0) return '0';
  
  if (Math.abs(value) < 0.00001) return '< 0.00001';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format a number as currency
 * @param {number} value - The number to format as currency
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined) return 'N/A';
  if (value === 0) return '$0';
  
  if (Math.abs(value) < 0.01) {
    return '< $0.01';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format a number as a percentage
 * @param {number} value - The number to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined) return 'N/A';
  if (value === 0) return '0%';
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};
