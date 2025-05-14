
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlockchainSlotMachine from '../components/BlockchainSlotMachine';
import Scoreboard from '../components/Scoreboard';
import GameFooter from '../components/GameFooter';
import WinningGuide from '../components/WinningGuide';
import WalletConnect from '../components/WalletConnect';
import WalletProvider from '../providers/WalletProvider';
import PirateShip from '../components/animations/PirateShip';
import TreasureChest from '../components/animations/TreasureChest';

// Ocean waves background animation
const OceanBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-pirate-navy bg-opacity-90"></div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-pirate-sea opacity-30"></div>
  </div>
);

// Main game component
const Index = () => {
  const [coins, setCoins] = useState<number>(500);
  const [isGameInitialized, setIsGameInitialized] = useState<boolean>(false);
  const [showChestOpen, setShowChestOpen] = useState<boolean>(false);
  
  // Initialize game
  useEffect(() => {
    // We could load saved game state from localStorage here
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
    // Open the treasure chest when winning
    setShowChestOpen(true);
    
    // Close the treasure chest after 3 seconds
    setTimeout(() => {
      setShowChestOpen(false);
    }, 3000);
  };
  
  return (
    <WalletProvider>
      <div className="min-h-screen relative overflow-hidden flex flex-col">
        {/* Background elements */}
        <OceanBackground />
        <PirateShip />
        <TreasureChest isOpen={showChestOpen} />
        
        {/* Content overlay */}
        <div className="relative z-10 flex-1 container max-w-md mx-auto px-4 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Main game area */}
          <main className="flex-1 flex flex-col">
            {/* Wallet connection */}
            <WalletConnect />
            
            {/* Scoreboard */}
            <Scoreboard coins={coins} />
            
            {/* Slot Machine */}
            <BlockchainSlotMachine onWin={handleWin} />
            
            {/* Winning combinations guide */}
            <WinningGuide />
          </main>
          
          {/* Footer with navigation */}
          <GameFooter />
        </div>
      </div>
    </WalletProvider>
  );
};

export default Index;
