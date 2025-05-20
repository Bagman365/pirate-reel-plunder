
import { useState } from 'react';
import { toast } from './use-toast';
import { useWallet } from '../providers/WalletProvider';

// Types for slot machine operations
interface SpinResult {
  betKey: string;
  symbols: string[];
  multiplier: number;
}

// Function to generate a random slot machine outcome
function generateSlotMachineResult(betAmount: number): SpinResult {
  // Symbols that can appear on the reels
  const possibleSymbols = ['coin', 'anchor', 'skull', 'map', 'gem', 'parrot', 'rum'];
  
  // Generate random symbols for each reel
  const symbols = [
    possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)],
    possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)],
    possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)]
  ];
  
  // Determine if it's a win and the multiplier
  let multiplier = 0;
  
  // Three of a kind - big win
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    // Different symbols have different values
    switch (symbols[0]) {
      case 'coin': multiplier = 5; break;
      case 'anchor': multiplier = 3; break;
      case 'skull': multiplier = 4; break;
      case 'map': multiplier = 7; break;
      case 'gem': multiplier = 6; break;
      case 'parrot': multiplier = 5; break;
      case 'rum': multiplier = 2; break;
      default: multiplier = 3;
    }
  }
  // Two of a kind - small win
  else if (symbols[0] === symbols[1] || symbols[1] === symbols[2] || symbols[0] === symbols[2]) {
    multiplier = 1.5;
  }
  
  // Generate a unique bet key - in a real blockchain implementation, this would be a transaction ID
  const betKey = `bet_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  return {
    betKey,
    symbols,
    multiplier
  };
}

// Simulate delay like actual blockchain transaction
const simulateBlockchainDelay = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500); // Slightly longer delay to simulate blockchain transaction
  });
};

// Hook for simulated blockchain operations
const useBlockchain = () => {
  const { balance, updateBalance } = useWallet();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Spin the slot machine
  const spinSlotMachine = async (betAmount: number): Promise<SpinResult | null> => {
    if (isProcessing) {
      return null;
    }
    
    // Check if player has sufficient balance
    if (balance < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Not enough VOI to place this bet",
        variant: "destructive",
      });
      return null;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Processing Blockchain Transaction",
        description: "Confirming your bet on the blockchain...",
      });
      
      // Deduct bet amount from balance
      updateBalance(-betAmount);
      
      // Simulate blockchain transaction delay
      await simulateBlockchainDelay();
      
      // Generate random result
      const result = generateSlotMachineResult(betAmount);
      
      return result;
    } catch (error) {
      console.error("Error with blockchain transaction:", error);
      toast({
        title: "Transaction Failed!",
        description: "There was an error processing your bet on the blockchain.",
        variant: "destructive",
      });
      // Refund the bet amount since transaction failed
      updateBalance(betAmount);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Claim winnings (simplified version that simulates a blockchain transaction)
  const claimWinnings = async (betKey: string, winAmount: number): Promise<boolean> => {
    if (isProcessing) {
      return false;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Processing Claim",
        description: "Claiming winnings on the blockchain...",
      });
      
      // Simulate blockchain confirmation delay
      await simulateBlockchainDelay();
      
      // Add winnings to balance
      updateBalance(winAmount);
      
      toast({
        title: "Winnings Claimed!",
        description: `${winAmount} VOI has been added to your wallet!`,
      });
      
      return true;
    } catch (error) {
      console.error("Error claiming winnings:", error);
      toast({
        title: "Claim Failed",
        description: "There was an error claiming your winnings.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    isProcessing,
    spinSlotMachine,
    claimWinnings
  };
};

export default useBlockchain;
