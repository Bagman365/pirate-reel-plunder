
import { useState, useEffect } from 'react';
import { toast } from '../../hooks/use-toast';
import FallingCoins from './FallingCoins';
import FloatingTreasure from './FloatingTreasure';

interface WinAnimationHandlerProps {
  showWin: boolean;
  winAmount: number;
  betAmount: number;
  onWin: (amount: number) => void;
}

const WinAnimationHandler = ({ showWin, winAmount, betAmount, onWin }: WinAnimationHandlerProps) => {
  const [showFloatingTreasure, setShowFloatingTreasure] = useState<boolean>(false);
  const [coins, setCoins] = useState<{ id: number; left: string; animationDelay: string }[]>([]);

  // Handle win animations
  useEffect(() => {
    if (showWin && winAmount > 0) {
      // Trigger win callback for UI effects
      onWin(winAmount);
      
      setShowFloatingTreasure(true);
      
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
        description: `Claim ${winAmount} VOI from the blockchain!`,
        duration: 3000
      });
      
      // Remove coins after animation
      const timer = setTimeout(() => {
        setCoins([]);
        setShowFloatingTreasure(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showWin, winAmount, betAmount, onWin]);

  return (
    <>
      {/* Floating treasure animation */}
      <FloatingTreasure active={showFloatingTreasure} itemCount={winAmount > betAmount * 3 ? 25 : 10} />
      
      {/* Falling coins animation */}
      <FallingCoins coins={coins} />
    </>
  );
};

export default WinAnimationHandler;
