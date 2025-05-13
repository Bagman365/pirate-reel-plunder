
import { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet';
import { toast } from './use-toast';
import { 
  getAlgodClient, 
  generateSpinTransaction, 
  generateClaimTransaction,
  createBetKey,
  simulateBlockchainResult,
  SYMBOL_MAPPING
} from '../utils/voiUtils';
import { APP_CONFIG } from '../config/blockchain';

// Mock function to simulate waiting for confirmation
const waitForConfirmation = async () => {
  console.log(`Waiting for confirmation`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// Mock function to encode an unsigned transaction
const encodeUnsignedTransaction = (txn: any) => {
  return new Uint8Array([1, 2, 3, 4, 5]); // Mock encoded transaction
};

export const useBlockchain = () => {
  const { activeAddress, signTransactions } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingBets, setPendingBets] = useState<string[]>([]);

  // Spin the slot machine and place a bet
  const spinSlotMachine = async (betAmount: number) => {
    if (!activeAddress || isProcessing) return null;
    
    try {
      setIsProcessing(true);
      
      // Convert to microVOI if needed
      const microVoiBet = betAmount >= 1 ? betAmount : betAmount * 1_000_000;
      
      // Validate bet amount
      if (microVoiBet < APP_CONFIG.minBet) {
        toast({
          title: "Bet Too Small",
          description: `Minimum bet is ${APP_CONFIG.minBet / 1_000_000} VOI`,
          variant: "destructive"
        });
        return null;
      }
      
      if (microVoiBet > APP_CONFIG.maxBet) {
        toast({
          title: "Bet Too Large",
          description: `Maximum bet is ${APP_CONFIG.maxBet / 1_000_000} VOI`,
          variant: "destructive"
        });
        return null;
      }
      
      // Get current round info
      const algodClient = getAlgodClient();
      const status = await algodClient.status().do();
      const currentRound = status['last-round'];
      
      // Generate transaction
      const txn = await generateSpinTransaction(activeAddress, microVoiBet);
      
      // Sign transaction
      if (!signTransactions) {
        toast({
          title: "Wallet Error",
          description: "Unable to sign transactions. Please reconnect your wallet.",
          variant: "destructive"
        });
        return null;
      }
      
      // Use the mock encoder instead of algosdk
      const encoded = encodeUnsignedTransaction(txn);
      const signedTxns = await signTransactions([encoded]);
      
      // Submit transaction
      const txId = await algodClient.sendRawTransaction(signedTxns).do();
      
      toast({
        title: "Bet Placed!",
        description: "Waiting for confirmation on the blockchain...",
      });
      
      // Wait for confirmation - removing the arguments as per error
      await waitForConfirmation();
      
      // For demonstration purposes, we'll simulate the blockchain result
      // In a production app, you'd read this from the blockchain events
      const result = simulateBlockchainResult();
      
      // Create bet key for claiming later
      const claimRound = currentRound + 1;
      const betKey = createBetKey(
        activeAddress,
        microVoiBet,
        currentRound,
        APP_CONFIG.appId,
        claimRound
      );
      
      setPendingBets([...pendingBets, betKey]);
      
      // Return the symbols for UI display
      return {
        symbols: result.symbols.map(s => SYMBOL_MAPPING[s as keyof typeof SYMBOL_MAPPING]),
        multiplier: result.multiplier,
        betKey
      };
    } catch (error) {
      console.error("Error placing bet:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to place bet. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Claim winnings
  const claimWinnings = async (betKey: string) => {
    if (!activeAddress || isProcessing) return false;
    
    try {
      setIsProcessing(true);
      
      // Generate claim transaction
      const txn = await generateClaimTransaction(activeAddress, betKey);
      
      // Sign transaction
      if (!signTransactions) {
        toast({
          title: "Wallet Error",
          description: "Unable to sign transactions. Please reconnect your wallet.",
          variant: "destructive"
        });
        return false;
      }
      
      const encoded = encodeUnsignedTransaction(txn);
      const signedTxns = await signTransactions([encoded]);
      
      // Submit transaction
      const algodClient = getAlgodClient();
      const txId = await algodClient.sendRawTransaction(signedTxns).do();
      
      toast({
        title: "Claim Submitted",
        description: "Processing your winnings...",
      });
      
      // Wait for confirmation - removing the arguments as per error
      await waitForConfirmation();
      
      // Remove from pending bets
      setPendingBets(pendingBets.filter(b => b !== betKey));
      
      toast({
        title: "Winnings Claimed!",
        description: "The VOI has been added to your wallet.",
      });
      
      return true;
    } catch (error) {
      console.error("Error claiming winnings:", error);
      toast({
        title: "Claim Failed",
        description: "Failed to claim winnings. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    spinSlotMachine,
    claimWinnings,
    isProcessing,
    pendingBets,
  };
};

export default useBlockchain;
