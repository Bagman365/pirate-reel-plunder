
import { useEffect, useState, useRef } from 'react';
import { toast } from '../hooks/use-toast';
import useBlockchain from '../hooks/useBlockchain';
import { useWallet } from '../providers/WalletProvider';
import SlotMachineReels from './slot-machine/SlotMachineReels';
import BetAmountSelector from './slot-machine/BetAmountSelector';
import SlotMachineControls from './slot-machine/SlotMachineControls';
import FallingCoins from './slot-machine/FallingCoins';
import PirateAnimatedBackground from './slot-machine/PirateAnimatedBackground';
import FloatingTreasure from './slot-machine/FloatingTreasure';
import { generateRandomReels, SYMBOLS } from '../utils/slotMachineUtils';
import { useSlotMachineAudio } from '../hooks/useSlotMachineAudio';

interface BlockchainSlotMachineProps {
  onWin: (amount: number) => void;
}

const BlockchainSlotMachine = ({ onWin }: BlockchainSlotMachineProps) => {
  // Initialize with random reels
  const [reels, setReels] = useState<string[][]>(generateRandomReels(3, 10));
  
  const [spinning, setSpinning] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>(['', '', '']);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [showWin, setShowWin] = useState<boolean>(false);
  const [showFloatingTreasure, setShowFloatingTreasure] = useState<boolean>(false);
  const [coins, setCoins] = useState<{ id: number; left: string; animationDelay: string }[]>([]);
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
    setShowFloatingTreasure(false);
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
  
  // Handle the spin result
  const handleSpinResult = (symbols: string[], multiplier: number) => {
    if (multiplier > 0) {
      const calculatedWinAmount = Math.floor(betAmount * multiplier * 100) / 100;
      setWinAmount(calculatedWinAmount);
      
      // Trigger win callback for UI effects
      onWin(calculatedWinAmount);
      
      // Show win animations and play sound
      setShowWin(true);
      setShowFloatingTreasure(true);
      playWinSound();
      
      // Create falling coins animation
      const newCoins = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        left: `${Math.random() * 80 + 10}%`,
        animationDelay: `${Math.random() * 0.5}s`
      }));
      setCoins(newCoins);
      
      // Show toast with win message
      toast({
        title: "Yarrr! You won!",
        description: `Claim ${calculatedWinAmount} VOI from the blockchain!`,
        duration: 3000
      });
      
      // Remove coins after animation
      setTimeout(() => {
        setCoins([]);
        setShowFloatingTreasure(false);
      }, 3000);
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

  // Claim winnings if available
  const handleClaim = async () => {
    if (!currentBetKey || isProcessing || winAmount <= 0) return;
    
    const success = await claimWinnings(currentBetKey, winAmount);
    if (success) {
      setCurrentBetKey(null);
      setWinAmount(0);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Pirate themed animated background */}
      <PirateAnimatedBackground />
      
      {/* Floating treasure animation */}
      <FloatingTreasure active={showFloatingTreasure} itemCount={winAmount > betAmount * 3 ? 25 : 10} />
      
      {/* Balance display - Now using wallet balance */}
      <div className="relative z-10 mb-4 bg-pirate-darkwood/80 rounded-lg p-2 text-center">
        <span className="font-pirata text-xl text-pirate-gold">Balance: {balance} VOI</span>
      </div>
      
      {/* Slot Machine Frame */}
      <div className="relative z-10 border-8 border-pirate-darkwood rounded-lg bg-pirate-navy/80 backdrop-blur-sm p-4 shadow-2xl">
        {/* Background glow effect for wins */}
        {showWin && (
          <div className="absolute inset-0 bg-pirate-gold/10 animate-pulse-glow z-0"></div>
        )}
        
        {/* Machine Header */}
        <div className="bg-pirate-wood rounded-t-lg p-2 mb-4 border-b-4 border-pirate-darkwood">
          <h2 className="text-center font-pirata text-3xl text-pirate-gold pirate-text-shadow">
            Pirate Slots
          </h2>
        </div>
        
        {/* Bet Amount Selector */}
        <BetAmountSelector 
          betAmount={betAmount} 
          onBetChange={handleBetChange} 
          disabled={spinning || isProcessing} 
        />
        
        {/* Reels Container */}
        <SlotMachineReels 
          reels={reels} 
          results={results} 
          spinning={spinning} 
          showWin={showWin} 
        />
        
        {/* Controls */}
        <SlotMachineControls 
          leverRef={leverRef}
          onPullLever={pullLever}
          onClaim={handleClaim}
          canSpin={canSpin && isConnected}
          spinning={spinning}
          isProcessing={isProcessing}
          activeAddress={isConnected ? "connected" : undefined}
          currentBetKey={currentBetKey}
        />

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
            <span className="text-pirate-gold font-pirata animate-pulse">Processing Blockchain Transaction...</span>
          </div>
        )}
        
        {/* Wallet connection notice */}
        {!isConnected && (
          <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
            <span className="text-pirate-gold font-pirata">Connect your wallet to play!</span>
          </div>
        )}
      </div>
      
      {/* Falling coins animation */}
      <FallingCoins coins={coins} />
      
      {/* Audio elements for sounds */}
      <audio src="/spin-sound.mp3" preload="auto" id="spin-sound"></audio>
      <audio src="/win-sound.mp3" preload="auto" id="win-sound"></audio>
      <audio src="/lose-sound.mp3" preload="auto" id="lose-sound"></audio>
    </div>
  );
};

export default BlockchainSlotMachine;
