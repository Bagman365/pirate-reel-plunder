
import { useState, useRef } from 'react';
import { toast } from './use-toast';
import useBlockchain from './useBlockchain';
import { useWallet } from '../providers/WalletProvider';
import { useSlotMachineAudio } from './useSlotMachineAudio';
import { generateRandomReels, SYMBOLS } from '../utils/slotMachineUtils';
import { recordGameResult } from '../services/statsService';

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
  const { isConnected, balance, signLogicSigTransaction } = useWallet();
  
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
      
      // Record the win in stats
      recordGameResult(betAmount, calculatedWinAmount);
      
      // Show win animations and play sound
      setShowWin(true);
      playWinSound();
      
    } else {
      // No match - lose
      playLoseSound();
      
      // Record the loss in stats
      recordGameResult(betAmount, 0);
      
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
        title: "⚓ Ahoy, matey!",
        description: "Connect yer wallet to spin for treasure!",
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
    
    // Sign the transaction on-chain
    const txData = {
      type: 'slot_spin',
      betAmount: betAmount,
      timestamp: Date.now()
    };
    
    const txSignature = await signLogicSigTransaction(txData);
    
    if (!txSignature) {
      setSpinning(false);
      setCanSpin(true);
      toast({
        title: "Transaction Failed",
        description: "Failed to sign the spin transaction",
        variant: "destructive"
      });
      return;
    }
    
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
    
    // Sign the claim transaction
    const txData = {
      type: 'claim_winnings',
      betKey: currentBetKey,
      amount: winAmount,
      timestamp: Date.now()
    };
    
    const txSignature = await signLogicSigTransaction(txData);
    
    if (!txSignature) {
      toast({
        title: "Transaction Failed",
        description: "Failed to sign the claim transaction",
        variant: "destructive"
      });
      return;
    }
    
    const success = await claimWinnings(currentBetKey, winAmount);
    if (success) {
      setCurrentBetKey(null);
      setWinAmount(0);
      
      // Record claim in localStorage for leaderboard
      const claims = JSON.parse(localStorage.getItem('claims_history') || '[]');
      claims.push({
        betKey: currentBetKey,
        amount: winAmount,
        timestamp: Date.now(),
        txId: txSignature
      });
      localStorage.setItem('claims_history', JSON.stringify(claims));
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
