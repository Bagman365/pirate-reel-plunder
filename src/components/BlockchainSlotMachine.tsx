
import { useEffect } from 'react';
import { useSlotMachineLogic } from '../hooks/useSlotMachineLogic';
import SlotMachineReels from './slot-machine/SlotMachineReels';
import BetAmountSelector from './slot-machine/BetAmountSelector';
import SlotMachineControls from './slot-machine/SlotMachineControls';
import WinAnimationHandler from './slot-machine/WinAnimationHandler';
import SlotMachineStatus from './slot-machine/SlotMachineStatus';

interface BlockchainSlotMachineProps {
  onWin: (amount: number) => void;
}

const BlockchainSlotMachine = ({ onWin }: BlockchainSlotMachineProps) => {
  // Use the custom hook for slot machine logic
  const {
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
  } = useSlotMachineLogic(onWin);

  // Load audio elements for the slot machine
  useEffect(() => {
    // These are still included in the DOM for backward compatibility
    const audioElements = [
      {id: 'spin-sound', src: '/spin-sound.mp3'},
      {id: 'win-sound', src: '/win-sound.mp3'},
      {id: 'lose-sound', src: '/lose-sound.mp3'}
    ];
    
    audioElements.forEach(audio => {
      if (!document.getElementById(audio.id)) {
        const audioElement = document.createElement('audio');
        audioElement.id = audio.id;
        audioElement.src = audio.src;
        audioElement.preload = 'auto';
        document.body.appendChild(audioElement);
      }
    });
    
    return () => {
      audioElements.forEach(audio => {
        const element = document.getElementById(audio.id);
        if (element) {
          document.body.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto z-20">
      {/* Win animations handler */}
      <WinAnimationHandler 
        showWin={showWin} 
        winAmount={winAmount} 
        betAmount={betAmount} 
        onWin={onWin} 
      />
      
      {/* Status display - balance and notices */}
      <SlotMachineStatus 
        isProcessing={isProcessing}
        isConnected={isConnected}
      />
      
      {/* Slot Machine Frame */}
      <div className="relative z-10 border-8 border-pirate-darkwood rounded-lg bg-pirate-navy/80 backdrop-blur-sm p-4 shadow-2xl">
        {/* Background glow effect for wins */}
        {showWin && (
          <div className="absolute inset-0 bg-pirate-gold/10 animate-pulse-glow z-0"></div>
        )}
        
        {/* Machine Header */}
        <div className="bg-pirate-wood rounded-t-lg p-2 mb-4 border-b-4 border-pirate-darkwood">
          <h2 className="text-center font-pirata text-3xl text-pirate-gold pirate-text-shadow">
            Pirate Plunder
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
    </div>
  );
};

export default BlockchainSlotMachine;
