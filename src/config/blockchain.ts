
// Voi Casino Smart Contract configuration
export const NETWORK = {
  mainnet: {
    name: 'Voi Mainnet',
    slotMachineAppId: 40048754,
    ybtAppId: 40048753,
    algodServer: 'https://mainnet-api.voi.nodly.io',
    indexerServer: 'https://mainnet-idx.voi.nodly.io',
    algodPort: '',
    indexerPort: '',
    algodToken: '',
    currency: 'VOI',
    genesisHash: 'mOUqAuTjCW85XzbN1VvzIVn3RRRvPQYIoQQjYmAcNXw=',
  },
  testnet: {
    name: 'Voi Testnet',
    slotMachineAppId: 50834,
    ybtAppId: 50838,
    algodServer: 'https://testnet-api.voi.nodly.io',
    indexerServer: 'https://testnet-idx.voi.nodly.io',
    algodPort: '',
    indexerToken: '',
    algodToken: '',
    currency: 'VOI',
    genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',
  },
};

// Default to testnet for safer development
export const DEFAULT_NETWORK = 'testnet';

// App-specific configuration
export const APP_CONFIG = {
  appId: 1234, // Your app ID for the purpose of tracking bets
  minBet: 1000000, // 1 VOI in microVOI
  maxBet: 100000000, // 100 VOI in microVOI
};

// Map of blockchain symbols to UI symbols
export const SYMBOL_MAPPING = {
  0: 'coin',
  1: 'anchor',
  2: 'skull', 
  3: 'map',
  4: 'gem',
  5: 'parrot',
  6: 'rum'
};

// Payout multipliers (these will come from the contract but defined here for UI)
export const PAYOUT_MULTIPLIERS = {
  'coin': 2,
  'anchor': 1.5,
  'skull': 1.75,
  'map': 4,
  'gem': 3,
  'parrot': 2.5,
  'rum': 1.3
};
