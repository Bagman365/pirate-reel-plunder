
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlockchainSlotMachine from '../components/BlockchainSlotMachine';
import WalletConnect from '../components/WalletConnect';
import GameFooter from '../components/GameFooter';
import RainingCoins from '../components/animations/RainingCoins';

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
      
      {/* Raining coins background animation */}
      <RainingCoins />
      
      {/* Content overlay - adjusted spacing with specific max-width for better central focus */}
      <div className="relative z-10 flex-1 container mx-auto px-4 flex flex-col py-4">
        {/* Header with added margin for spacing */}
        <div className="mb-4">
          <Header />
        </div>
        
        {/* Main game area with centered content and proper spacing */}
        <main className="flex-1">
          {/* Game wrapper with three-column layout */}
          <div className="game-wrapper flex justify-center items-center gap-[100px] px-10 max-w-[1440px] mx-auto">
            {/* Left side image (only shown on larger screens) */}
            <div className="side-image left hidden md:block" style={{ width: '300px', flexShrink: 0 }}>
              <img 
                src="/lovable-uploads/e843e5e7-ed11-4afe-bd2d-5e0a849b3c22.png" 
                alt="Pirate Captain" 
                className="w-full h-auto transition-opacity duration-1000 opacity-80"
              />
            </div>
            
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
            
            {/* Right side image (only shown on larger screens) */}
            <div className="side-image right hidden md:block" style={{ width: '300px', flexShrink: 0 }}>
              <img 
                src="/lovable-uploads/97409236-4d82-4f80-81e6-b865eea29cb8.png" 
                alt="Pirate Slot Machine" 
                className="w-full h-auto transition-opacity duration-1000 opacity-80"
              />
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
