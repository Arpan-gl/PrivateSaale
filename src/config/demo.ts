// Demo mode configuration
export const DEMO_CONFIG = {
  // Set to true to enable demo mode (no backend required)
  ENABLED: true,
  
  // Demo mode settings
  SIMULATE_DELAYS: true,
  MIN_DELAY_MS: 500,
  MAX_DELAY_MS: 2000,
  
  // Hide demo indicators
  HIDE_DEMO_INDICATORS: true,
  
  // Demo user info
  DEMO_USER: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user'
  }
};

// Helper function to check if demo mode is enabled
export const isDemoMode = () => DEMO_CONFIG.ENABLED;

// Helper function to get random delay for simulation
export const getRandomDelay = () => {
  if (!DEMO_CONFIG.SIMULATE_DELAYS) return 0;
  return Math.random() * (DEMO_CONFIG.MAX_DELAY_MS - DEMO_CONFIG.MIN_DELAY_MS) + DEMO_CONFIG.MIN_DELAY_MS;
};
