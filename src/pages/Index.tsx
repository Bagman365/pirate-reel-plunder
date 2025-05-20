
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlockchainSlotMachine from '../components/BlockchainSlotMachine';
import WalletConnect from '../components/WalletConnect';
import GameFooter from '../components/GameFooter';
import PirateAnimatedBackground from '../components/slot-machine/PirateAnimatedBackground';

// Ocean waves background animation
const OceanBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-pirate-navy to-pirate-navy/90 bg-opacity-90"></div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-pirate-sea opacity-30 animate-sail"></div>
  </div>
);

// Main game component
const Index = () => {
  const [isGameInitialized, setIsGameInitialized] = useState<boolean>(false);
  
  // Initialize game
  useEffect(() => {
    setIsGameInitialized(true);
  }, []);
  
  // Handle winning event - only for UI effects, actual balance is managed in useBlockchain hook
  const handleWin = (amount: number) => {
    // This is now mainly for visual effects and potentially game statistics
    console.log(`Win event: ${amount} VOI`);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background elements */}
      <OceanBackground />
      <PirateAnimatedBackground />
      
      {/* Content overlay */}
      <div className="relative z-10 flex-1 container max-w-md mx-auto px-4 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Wallet Connection */}
        <div className="mb-4">
          <WalletConnect />
        </div>
        
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
