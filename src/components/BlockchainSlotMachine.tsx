
import { useEffect, useState, useRef } from 'react';
import { toast } from '../hooks/use-toast';
import useBlockchain from '../hooks/useBlockchain';
import SlotMachineReels from './slot-machine/SlotMachineReels';
import BetAmountSelector from './slot-machine/BetAmountSelector';
import SlotMachineControls from './slot-machine/SlotMachineControls';
import FallingCoins from './slot-machine/FallingCoins';
import PirateAnimatedBackground from './slot-machine/PirateAnimatedBackground';
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
  const [coins, setCoins] = useState<{ id: number; left: string; animationDelay: string }[]>([]);
  const [betAmount, setBetAmount] = useState<number>(1); // Default 1 VOI
  const [currentBetKey, setCurrentBetKey] = useState<string | null>(null);
  const [playerBalance, setPlayerBalance] = useState<number>(500); // Starting balance of 500 coins
  
  const leverRef = useRef<HTMLDivElement>(null);
  
  // Audio hooks
  const { playSpinSound, playWinSound, playLoseSound } = useSlotMachineAudio();
  
  // Blockchain integration (now just simulation)
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
    
    // Check if player has enough balance
    if (playerBalance < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Ye don't have enough gold to place this bet, matey!",
        variant: "destructive"
      });
      return;
    }
    
    // Deduct bet amount from balance
    setPlayerBalance(prev => prev - betAmount);
    
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
    
    // Call for spin result
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
      const winAmount = Math.floor(betAmount * multiplier * 100) / 100;
      
      // Update player balance
      setPlayerBalance(prev => prev + winAmount);
      
      // Trigger win callback
      onWin(winAmount);
      
      // Show win animations and play sound
      setShowWin(true);
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
        description: `${winAmount} VOI have been added to yer treasure!`,
        duration: 3000
      });
      
      // Remove coins after animation
      setTimeout(() => {
        setCoins([]);
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
    if (!currentBetKey || isProcessing) return;
    
    const success = await claimWinnings(currentBetKey);
    if (success) {
      setCurrentBetKey(null);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Pirate themed animated background */}
      <PirateAnimatedBackground />
      
      {/* Balance display */}
      <div className="relative z-10 mb-4 bg-pirate-darkwood/80 rounded-lg p-2 text-center">
        <span className="font-pirata text-xl text-pirate-gold">Balance: {playerBalance} VOI</span>
      </div>
      
      {/* Slot Machine Frame */}
      <div className="relative z-10 border-8 border-pirate-darkwood rounded-lg bg-pirate-navy/80 backdrop-blur-sm p-4 shadow-2xl">
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
          canSpin={canSpin}
          spinning={spinning}
          isProcessing={isProcessing}
          activeAddress="player"
          currentBetKey={currentBetKey}
        />

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
            <span className="text-pirate-gold font-pirata">Processing...</span>
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
