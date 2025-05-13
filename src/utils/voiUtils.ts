
import { APP_CONFIG, NETWORK, DEFAULT_NETWORK, SYMBOL_MAPPING } from '../config/blockchain';

// Convert microVOI to standard VOI (1 VOI = 1,000,000 microVOI)
export const microToStandard = (amount: number): number => {
  return amount / 1_000_000;
};

// Convert standard VOI to microVOI
export const standardToMicro = (amount: number): number => {
  return Math.floor(amount * 1_000_000);
};

// Format VOI with proper decimal places
export const formatVoi = (amount: number): string => {
  return (amount / 1_000_000).toFixed(6);
};

// Temporary mock implementation until we get algosdk working
export const getAlgodClient = () => {
  console.log('Mock algod client created');
  return {
    status: () => ({
      do: async () => ({ 'last-round': 1000000 })
    }),
    getTransactionParams: () => ({
      do: async () => ({ fee: 1000, firstRound: 1000, lastRound: 2000 })
    }),
    sendRawTransaction: () => ({
      do: async () => ({ txId: 'mock-txn-id' })
    })
  };
};

// Create a bet key from transaction data
export const createBetKey = (
  sender: string,
  amount: number,
  confirmedRound: number,
  index: number,
  claimRound: number
): string => {
  return `${sender}-${amount}-${confirmedRound}-${index}-${claimRound}`;
};

// Parse a bet key back into its components
export const parseBetKey = (
  betKey: string
): { sender: string; amount: number; confirmedRound: number; index: number; claimRound: number } => {
  const [sender, amount, confirmedRound, index, claimRound] = betKey.split('-');
  return {
    sender,
    amount: parseInt(amount),
    confirmedRound: parseInt(confirmedRound),
    index: parseInt(index),
    claimRound: parseInt(claimRound),
  };
};

// Mock function to simulate blockchain result (for testing)
export const simulateBlockchainResult = (): { symbols: number[]; multiplier: number } => {
  const symbols = [
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 7)
  ];
  
  // Calculate multiplier based on matching symbols
  let multiplier = 0;
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    // All three match - big win
    multiplier = 3;
  } else if (symbols[0] === symbols[1] || symbols[1] === symbols[2] || symbols[0] === symbols[2]) {
    // Two match - small win
    multiplier = 1.2;
  }
  
  return { symbols, multiplier };
};

// Mock implementation for generateSpinTransaction
export const generateSpinTransaction = async (sender: string, amount: number) => {
  console.log(`Mock spin transaction created for ${sender} with amount ${amount}`);
  return { type: 'appl' };
};

// Mock implementation for generateClaimTransaction
export const generateClaimTransaction = async (sender: string, betKey: string) => {
  console.log(`Mock claim transaction created for ${sender} with betKey ${betKey}`);
  return { type: 'appl' };
};

// Re-export SYMBOL_MAPPING to maintain compatibility
export { SYMBOL_MAPPING };
