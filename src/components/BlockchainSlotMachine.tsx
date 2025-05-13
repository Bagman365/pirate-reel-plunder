
import { useEffect, useState, useRef } from 'react';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';
import { 
  Anchor, 
  Coins, 
  Gem, 
  Map, 
  Skull, 
  Flag, 
  Star
} from 'lucide-react';
import { useWallet } from '@txnlab/use-wallet';
import useBlockchain from '../hooks/useBlockchain';
import { standardToMicro, microToStandard } from '../utils/voiUtils';

// Constants for the slot machine
const SYMBOLS = ['coin', 'anchor', 'skull', 'map', 'gem', 'parrot', 'rum'];
const SYMBOL_ICONS: Record<string, React.ReactNode> = {
  coin: <Coins className="text-pirate-gold" />,
  anchor: <Anchor className="text-gray-400" />,
  skull: <Skull className="text-white" />,
  map: <Map className="text-pirate-parchment" />,
  gem: <Gem className="text-blue-500" />,
  parrot: <Flag className="text-red-500" />,
  rum: <Star className="text-pirate-gold" />
};

// Points for each symbol combination
const SYMBOL_POINTS: Record<string, number> = {
  coin: 100,
  anchor: 50,
  skull: 75,
  map: 200,
  gem: 150,
  parrot: 125,
  rum: 30
};

interface BlockchainSlotMachineProps {
  onWin: (amount: number) => void;
}

const BlockchainSlotMachine = ({ onWin }: BlockchainSlotMachineProps) => {
  const [reels, setReels] = useState<string[][]>([
    Array(10).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
    Array(10).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
    Array(10).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
  ]);
  
  const [spinning, setSpinning] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>(['', '', '']);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [showWin, setShowWin] = useState<boolean>(false);
  const [coins, setCoins] = useState<{ id: number; left: string; animationDelay: string }[]>([]);
  const [betAmount, setBetAmount] = useState<number>(1); // Default 1 VOI
  const [currentBetKey, setCurrentBetKey] = useState<string | null>(null);
  
  const leverRef = useRef<HTMLDivElement>(null);
  
  // Sound references
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const loseSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Blockchain integration
  const wallet = useWallet();
  const { activeAddress, activeAccount } = wallet;
  const { spinSlotMachine, claimWinnings, isProcessing } = useBlockchain();
  
  useEffect(() => {
    // Initialize audio elements
    spinSoundRef.current = new Audio('/spin-sound.mp3');
    winSoundRef.current = new Audio('/win-sound.mp3');
    loseSoundRef.current = new Audio('/lose-sound.mp3');
    
    // Cleanup on unmount
    return () => {
      spinSoundRef.current?.pause();
      winSoundRef.current?.pause();
      loseSoundRef.current?.pause();
    };
  }, []);
  
  // Pull the lever to spin the reels
  const pullLever = async () => {
    if (!canSpin || spinning || isProcessing) return;
    
    if (!activeAddress) {
      toast({
        title: "Connect Wallet",
        description: "You need to connect your wallet to play.",
        variant: "destructive"
      });
      return;
    }
    
    // Check balance - using amount instead of balance
    if (activeAccount && (activeAccount.amount || 0) < standardToMicro(betAmount)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough VOI to place this bet.",
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
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(e => console.error("Error playing spin sound:", e));
    }
    
    setSpinning(true);
    setCanSpin(false);
    setShowWin(false);
    setCurrentBetKey(null);
    
    // Call blockchain for spin
    const result = await spinSlotMachine(betAmount);
    
    if (!result) {
      setSpinning(false);
      setCanSpin(true);
      return;
    }
    
    // Generate new reel positions based on blockchain result
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
          handleBlockchainResult(spinResults, result.multiplier);
          setSpinning(false);
          setCanSpin(true);
        }, 500); // Third reel stops
      }, 500); // Second reel stops
    }, 1000); // First reel stops
  };
  
  // Handle the blockchain result
  const handleBlockchainResult = (symbols: string[], multiplier: number) => {
    if (multiplier > 0) {
      const winAmount = Math.floor(betAmount * multiplier * 1000000) / 1000000;
      onWin(winAmount);
      
      // Show win animations and play sound
      setShowWin(true);
      
      if (winSoundRef.current) {
        winSoundRef.current.currentTime = 0;
        winSoundRef.current.play().catch(e => console.error("Error playing win sound:", e));
      }
      
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
      if (loseSoundRef.current) {
        loseSoundRef.current.currentTime = 0;
        loseSoundRef.current.play().catch(e => console.error("Error playing lose sound:", e));
      }
      
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

  // Update bet amount
  const handleBetChange = (amount: number) => {
    if (amount >= 0.1 && amount <= 100) {
      setBetAmount(amount);
    }
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Slot Machine Frame */}
      <div className="border-8 border-pirate-darkwood rounded-lg bg-pirate-navy p-4 shadow-2xl">
        {/* Machine Header */}
        <div className="bg-pirate-wood rounded-t-lg p-2 mb-4 border-b-4 border-pirate-darkwood">
          <h2 className="text-center font-pirata text-3xl text-pirate-gold pirate-text-shadow">
            Voi Casino
          </h2>
        </div>
        
        {/* Bet Amount Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-pirate-darkwood rounded p-2">
            <span className="text-pirate-gold font-pirata">Bet Amount:</span>
            <div className="flex items-center">
              <Button 
                variant="ghost"
                className="text-pirate-gold h-8 w-8 p-0" 
                onClick={() => handleBetChange(Math.max(betAmount - 1, 0.1))}
                disabled={betAmount <= 0.1 || spinning || isProcessing}
              >
                -
              </Button>
              <span className="text-pirate-gold font-pirata mx-2">
                {betAmount} VOI
              </span>
              <Button 
                variant="ghost"
                className="text-pirate-gold h-8 w-8 p-0" 
                onClick={() => handleBetChange(Math.min(betAmount + 1, 100))}
                disabled={betAmount >= 100 || spinning || isProcessing}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        
        {/* Reels Container */}
        <div className="flex justify-center mb-6 gap-2 bg-black p-2 rounded-lg border-2 border-pirate-gold overflow-hidden">
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="relative w-1/3 h-20 overflow-hidden border border-pirate-gold rounded bg-gray-900">
              <div 
                className={`absolute w-full transition-transform duration-1000 ${spinning ? 'animate-spin-reel' : ''}`}
                style={{ 
                  transform: results[reelIndex] && !spinning ? 'translateY(-120px)' : 'translateY(0px)'
                }}
              >
                {reel.map((symbol, symbolIndex) => (
                  <div 
                    key={`${reelIndex}-${symbolIndex}`} 
                    className="h-20 flex items-center justify-center text-4xl"
                  >
                    {SYMBOL_ICONS[symbol]}
                  </div>
                ))}
              </div>
              
              {/* Result highlight box */}
              {results[reelIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-full h-20 flex items-center justify-center text-4xl ${
                    showWin ? 'bg-yellow-300/20' : ''
                  }`}>
                    {SYMBOL_ICONS[results[reelIndex]]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          {/* Left side - Lever */}
          <div 
            ref={leverRef}
            className="w-16 h-20 flex flex-col items-center cursor-pointer transform origin-bottom transition-transform"
            onClick={pullLever}
          >
            <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-pirate-gold"></div>
            <div className="w-4 h-16 bg-pirate-wood rounded-b-lg border-x-2 border-b-2 border-pirate-darkwood"></div>
          </div>
          
          {/* Right side - Spin button */}
          <div className="flex flex-col gap-2">
            <Button 
              onClick={pullLever}
              disabled={!canSpin || spinning || isProcessing || !activeAddress}
              className="bg-pirate-gold hover:bg-amber-500 text-pirate-navy font-bold py-2 px-6 rounded border-2 border-pirate-darkwood font-pirata text-xl"
            >
              {isProcessing ? "Processing..." : spinning ? "Spinning..." : "SPIN"}
            </Button>
            
            {currentBetKey && (
              <Button
                onClick={handleClaim}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded border-2 border-pirate-darkwood font-pirata text-sm"
              >
                {isProcessing ? "Processing..." : "Claim Winnings"}
              </Button>
            )}
          </div>
        </div>

        {/* Blockchain Status */}
        {isProcessing && (
          <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
            <span className="text-pirate-gold font-pirata">Transaction in progress...</span>
          </div>
        )}
        
        {!activeAddress && (
          <div className="mt-4 p-2 bg-red-900/50 rounded text-center">
            <span className="text-pirate-parchment font-pirata">Connect your wallet to play!</span>
          </div>
        )}
      </div>
      
      {/* Falling coins animation */}
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="coin animate-coin-fall"
          style={{
            left: coin.left,
            animationDelay: coin.animationDelay,
          }}
        />
      ))}
      
      {/* Audio elements for sounds */}
      <audio src="/spin-sound.mp3" preload="auto" id="spin-sound"></audio>
      <audio src="/win-sound.mp3" preload="auto" id="win-sound"></audio>
      <audio src="/lose-sound.mp3" preload="auto" id="lose-sound"></audio>
    </div>
  );
};

export default BlockchainSlotMachine;
