
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
          {/* Game wrapper with three-column layout - adjusted for larger side images */}
          <div className="game-wrapper flex justify-center items-center gap-[60px] px-6 max-w-[1440px] mx-auto">
            {/* Left side image (only shown on larger screens) - 60% larger with animation */}
            <div className="side-image left hidden md:block" style={{ width: '480px', flexShrink: 0 }}>
              <img 
                src="/lovable-uploads/b760e77d-f657-4f34-a43e-8357f2cb1e73.png" 
                alt="Pirates with Treasure" 
                className="w-full h-auto transition-opacity duration-1000 opacity-80 animate-float hover:animate-bounce-subtle"
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
            
            {/* Right side image (only shown on larger screens) - 60% larger with animation */}
            <div className="side-image right hidden md:block" style={{ width: '480px', flexShrink: 0 }}>
              <img 
                src="/lovable-uploads/304c2fa2-0cc0-48fb-8ada-9a36bf2c9a5b.png" 
                alt="Pirate Captain" 
                className="w-full h-auto transition-opacity duration-1000 opacity-80 animate-swing"
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
