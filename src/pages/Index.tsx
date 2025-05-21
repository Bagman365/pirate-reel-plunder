
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlockchainSlotMachine from '../components/BlockchainSlotMachine';
import WalletConnect from '../components/WalletConnect';
import GameFooter from '../components/GameFooter';
import RainingCoins from '../components/animations/RainingCoins';
import PirateAnimatedBackground from '../components/slot-machine/PirateAnimatedBackground';

// Main game component
const Index = () => {
  const [isGameInitialized, setIsGameInitialized] = useState<boolean>(false);
  
  // Initialize game
  useEffect(() => {
    setIsGameInitialized(true);
  }, []);
  
  // Handle winning event - only for UI effects, actual balance is managed in useBlockchain hook
  const handleWin = (amount: number) => {
    // This is mainly for visual effects and potentially game statistics
    console.log(`Win event: ${amount} VOI`);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background with pirate theme */}
      <div className="fixed inset-0 z-0 bg-pirate-navy"></div>
      
      {/* Pirates background image */}
      <PirateAnimatedBackground />
      
      {/* Raining coins background animation */}
      <RainingCoins />
      
      {/* Content overlay - adjusted spacing with specific max-width for better central focus */}
      <div className="relative z-20 flex-1 container mx-auto px-4 flex flex-col py-4">
        {/* Header with added margin for spacing */}
        <div className="mb-4">
          <Header />
        </div>
        
        {/* Main game area with centered content and proper spacing */}
        <main className="flex-1">
          {/* Game wrapper without side images */}
          <div className="game-wrapper flex justify-center items-center px-10 max-w-[1440px] mx-auto">
            {/* Center content column with consistent width */}
            <div className="flex flex-col items-center w-full max-w-[480px]">
              {/* Wallet Connection section - matched width with game container */}
              <div className="w-full mb-4 mt-4">
                <WalletConnect />
              </div>
              
              {/* Center slot machine */}
              <div className="main-game w-full">
                <BlockchainSlotMachine onWin={handleWin} />
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer with navigation */}
        <GameFooter />
      </div>
    </div>
  );
};

export default Index;
