
import algosdk from 'algosdk';
import { APP_CONFIG, NETWORK, DEFAULT_NETWORK } from '../config/blockchain';

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

// Get the Algorand client for the current network
export const getAlgodClient = () => {
  const network = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK];
  return new algosdk.Algodv2(network.algodToken, network.algodServer, network.algodPort);
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

// Generate a spin transaction for the slot machine
export const generateSpinTransaction = async (
  sender: string,
  amount: number
): Promise<algosdk.Transaction> => {
  const algodClient = getAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  const appId = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK].slotMachineAppId;
  
  // Create payment transaction for the wager
  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: sender,
    to: algosdk.getApplicationAddress(appId),
    amount: amount,
    suggestedParams
  });
  
  // Create application call transaction
  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    from: sender,
    appIndex: appId,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [new Uint8Array(Buffer.from('spin')), algosdk.encodeUint64(APP_CONFIG.appId)],
    suggestedParams
  });
  
  // Combine transactions
  algosdk.assignGroupID([paymentTxn, appCallTxn]);
  
  return appCallTxn;
};

// Generate a claim transaction
export const generateClaimTransaction = async (
  sender: string,
  betKey: string
): Promise<algosdk.Transaction> => {
  const algodClient = getAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Increase the fee for claim to ensure it's processed quickly
  suggestedParams.fee = 2000;
  
  const appId = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK].slotMachineAppId;
  const { confirmedRound, index, claimRound } = parseBetKey(betKey);
  
  // Create application call transaction for claiming
  const claimTxn = algosdk.makeApplicationCallTxnFromObject({
    from: sender,
    appIndex: appId,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from('claim')),
      algosdk.encodeUint64(confirmedRound),
      algosdk.encodeUint64(index),
      algosdk.encodeUint64(claimRound)
    ],
    suggestedParams
  });
  
  return claimTxn;
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
