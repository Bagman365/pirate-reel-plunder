
import { useEffect, useState } from 'react';

interface Coin {
  id: number;
  left: string;
  size: string;
  rotation: string;
  delay: string;
  duration: string;
}

const RainingCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  
  // Generate new coins periodically
  useEffect(() => {
    // Initial set of coins
    generateCoins();
    
    // Add new coins every few seconds
    const interval = setInterval(() => {
      generateCoins(5); // Add 5 more coins periodically
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const generateCoins = (count = 15) => {
    const newCoins: Coin[] = [];
    
    for (let i = 0; i < count; i++) {
      newCoins.push({
        id: Date.now() + i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 15 + 10}px`, // Random size between 10-25px
        rotation: `${Math.random() * 360}deg`,
        delay: `${Math.random() * 2}s`,
        duration: `${Math.random() * 4 + 3}s`, // Random duration between 3-7s
      });
    }
    
    setCoins(prev => [...prev, ...newCoins]);
    
    // Remove older coins to prevent too many elements
    if (coins.length > 50) {
      setTimeout(() => {
        setCoins(prev => prev.slice(prev.length - 50));
      }, 7000);
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute coin-animation"
          style={{
            left: coin.left,
            width: coin.size,
            height: coin.size,
            transform: `rotate(${coin.rotation})`,
            animationDelay: coin.delay,
            animationDuration: coin.duration
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pirate-gold to-amber-600 shadow-lg opacity-60" />
        </div>
      ))}
    </div>
  );
};

export default RainingCoins;
