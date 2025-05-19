
// This file now contains only configuration for visual elements
// No actual blockchain interactions

// Map of symbols to UI symbols
export const SYMBOL_MAPPING = {
  0: 'coin',
  1: 'anchor',
  2: 'skull', 
  3: 'map',
  4: 'gem',
  5: 'parrot',
  6: 'rum'
};

// Payout multipliers for UI display
export const PAYOUT_MULTIPLIERS = {
  'coin': 2,
  'anchor': 1.5,
  'skull': 1.75,
  'map': 4,
  'gem': 3,
  'parrot': 2.5,
  'rum': 1.3
};

// App-specific configuration
export const APP_CONFIG = {
  minBet: 1, // 1 VOI
  maxBet: 100, // 100 VOI
};
