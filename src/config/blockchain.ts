
// Blockchain configuration

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

// Payout multipliers for blockchain payouts
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
  minBet: 0.1, // 0.1 VOI
  maxBet: 100, // 100 VOI
  defaultBalance: 500, // Starting balance for new players
};

// Add blockchain network configuration
export const BLOCKCHAIN_CONFIG = {
  chainId: '0xVOI', // Mock chain ID for VOI network
  chainName: 'VOI Network',
  nativeCurrency: {
    name: 'VOI',
    symbol: 'VOI',
    decimals: 18
  },
  blockExplorerUrl: 'https://voiscan.io'
};
