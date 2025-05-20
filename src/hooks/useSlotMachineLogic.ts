
import { useState, useRef } from 'react';
import { toast } from './use-toast';
import useBlockchain from './useBlockchain';
import { useWallet } from '../providers/WalletProvider';
import { useSlotMachineAudio } from './useSlotMachineAudio';
import { generateRandomReels, SYMBOLS } from '../utils/slotMachineUtils';

export const useSlotMachineLogic = (onWin: (amount: number) => void) => {
  // Initialize with random reels
  const [reels, setReels] = useState<string[][]>(generateRandomReels(3, 10));
  
  const [spinning, setSpinning] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>(['', '', '']);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [showWin, setShowWin] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number>(1); // Default 1 VOI
  const [currentBetKey, setCurrentBetKey] = useState<string | null>(null);
  const [winAmount, setWinAmount] = useState<number>(0);
  
  const leverRef = useRef<HTMLDivElement>(null);
  
  // Audio hooks
  const { playSpinSound, playWinSound, playLoseSound } = useSlotMachineAudio();
  
  // Wallet integration
  const { isConnected, balance } = useWallet();
  
  // Blockchain integration
  const { spinSlotMachine, claimWinnings, isProcessing } = useBlockchain();
  
  // Update bet amount
  const handleBetChange = (amount: number) => {
    if (amount >= 0.1 && amount <= 100) {
      setBetAmount(amount);
    }
  };

  // Handle the spin result
  const handleSpinResult = (symbols: string[], multiplier: number) => {
    if (multiplier > 0) {
      const calculatedWinAmount = Math.floor(betAmount * multiplier * 100) / 100;
      setWinAmount(calculatedWinAmount);
      
      // Show win animations and play sound
      setShowWin(true);
      playWinSound();
      
    } else {
      // No match - lose
      playLoseSound();
      
      toast({
        title: "Arrr, no treasure this time!",
        description: "Try again, ye scurvy dog!",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  // Pull the lever to spin the reels
  const pullLever = async () => {
    if (!canSpin || spinning || isProcessing) return;
    
    // Check if wallet is connected
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Connect your wallet to play the slot machine!",
        variant: "destructive"
      });
      return;
    }
    
    // Check if player has enough balance
    if (balance < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Ye don't have enough VOI to place this bet, matey!",
        variant: "destructive"
      });
      return;
    }
    
    // Pull animation for the lever
    if (leverRef.current) {
      leverRef.current.classList.add('animate-lever-pull');
      setTimeout(() => {
        if (leverRef.current) leverRef.current.classList.remove('animate-lever-pull');
      }, 500);
    }
    
    // Play spin sound
    playSpinSound();
    
    setSpinning(true);
    setCanSpin(false);
    setShowWin(false);
    setCurrentBetKey(null);
    setWinAmount(0);
    
    // Call for spin result through blockchain
    const result = await spinSlotMachine(betAmount);
    
    if (!result) {
      setSpinning(false);
      setCanSpin(true);
      return;
    }
    
    // Generate new reel positions based on result
    const newReels = [
      [result.symbols[0], ...Array(9).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])],
      [result.symbols[1], ...Array(9).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])],
      [result.symbols[2], ...Array(9).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])]
    ];
    
    setReels(newReels);
    setCurrentBetKey(result.betKey);
    
    // Determine result after spinning
    const spinResults = result.symbols;
    
    // Staggered stop for each reel
    setTimeout(() => {
      setResults([spinResults[0], '', '']);
      
      setTimeout(() => {
        setResults([spinResults[0], spinResults[1], '']);
        
        setTimeout(() => {
          setResults([spinResults[0], spinResults[1], spinResults[2]]);
          handleSpinResult(spinResults, result.multiplier);
          setSpinning(false);
          setCanSpin(true);
        }, 500); // Third reel stops
      }, 500); // Second reel stops
    }, 1000); // First reel stops
  };

  // Claim winnings if available
  const handleClaim = async () => {
    if (!currentBetKey || isProcessing || winAmount <= 0) return;
    
    const success = await claimWinnings(currentBetKey, winAmount);
    if (success) {
      setCurrentBetKey(null);
      setWinAmount(0);
    }
  };

  return {
    reels,
    spinning,
    results,
    canSpin,
    showWin,
    betAmount,
    leverRef,
    currentBetKey,
    winAmount,
    isProcessing,
    isConnected,
    handleBetChange,
    pullLever,
    handleClaim
  };
};
