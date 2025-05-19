
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlockchainSlotMachine from '../components/BlockchainSlotMachine';
import GameFooter from '../components/GameFooter';
import PirateAnimatedBackground from '../components/slot-machine/PirateAnimatedBackground';

// Ocean waves background animation
const OceanBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-pirate-navy to-pirate-navy/90 bg-opacity-90"></div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-pirate-sea opacity-30 animate-sail"></div>
  </div>
);

// Ships silhouette in the background
const ShipSilhouette = () => (
  <div className="fixed bottom-10 right-5 z-0 opacity-20 animate-float">
    <div className="w-40 h-32 bg-black rounded-b-lg"></div>
    <div className="w-8 h-40 bg-black absolute -top-36 left-16"></div>
    <div className="w-20 h-10 bg-black absolute -top-28 left-10 rounded-t-full"></div>
  </div>
);

// Main game component
const Index = () => {
  const [coins, setCoins] = useState<number>(500);
  const [isGameInitialized, setIsGameInitialized] = useState<boolean>(false);
  
  // Initialize game
  useEffect(() => {
    // Load saved game state from localStorage here
    const savedCoins = localStorage.getItem('pirateSlots_coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
    
    setIsGameInitialized(true);
  }, []);
  
  // Save game state when coins change
  useEffect(() => {
    if (isGameInitialized) {
      localStorage.setItem('pirateSlots_coins', coins.toString());
    }
  }, [coins, isGameInitialized]);
  
  // Handle winning coins
  const handleWin = (amount: number) => {
    setCoins(prev => prev + amount);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background elements */}
      <OceanBackground />
      <ShipSilhouette />
      <PirateAnimatedBackground />
      
      {/* Content overlay */}
      <div className="relative z-10 flex-1 container max-w-md mx-auto px-4 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main game area */}
        <main className="flex-1 flex flex-col">
          {/* Slot Machine */}
          <BlockchainSlotMachine onWin={handleWin} />
        </main>
        
        {/* Footer with navigation */}
        <GameFooter />
      </div>
    </div>
  );
};

export default Index;
