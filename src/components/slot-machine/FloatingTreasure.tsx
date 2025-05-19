
import { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  type: 'coin' | 'gem' | 'chest';
  size: string;
  left: string;
  animationDelay: string;
  rotation: string;
}

interface FloatingTreasureProps {
  active: boolean;
  itemCount?: number;
}

const FloatingTreasure = ({ active, itemCount = 15 }: FloatingTreasureProps) => {
  const [treasureItems, setTreasureItems] = useState<FloatingItem[]>([]);
  
  useEffect(() => {
    if (active) {
      const newItems: FloatingItem[] = [];
      
      // Generate random treasure items
      for (let i = 0; i < itemCount; i++) {
        // Randomly select item type
        const itemTypes = ['coin', 'gem', 'chest'];
        const type = itemTypes[Math.floor(Math.random() * itemTypes.length)] as 'coin' | 'gem' | 'chest';
        
        // Create a floating item
        newItems.push({
          id: Date.now() + i,
          type,
          size: `${Math.random() * 20 + 15}px`, // Random size between 15-35px
          left: `${Math.random() * 90 + 5}%`, // Random horizontal position
          animationDelay: `${Math.random() * 0.5}s`, // Random delay
          rotation: `${Math.random() * 360}deg`, // Random rotation
        });
      }
      
      setTreasureItems(newItems);
      
      // Remove items after animation completes
      const timer = setTimeout(() => {
        setTreasureItems([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active, itemCount]);
  
  if (!active && treasureItems.length === 0) return null;
  
  return (
    <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
      {treasureItems.map((item) => {
        let bgColor = 'bg-pirate-gold'; // Default for coins
        
        if (item.type === 'gem') {
          bgColor = 'bg-blue-500';
        } else if (item.type === 'chest') {
          bgColor = 'bg-amber-800';
        }
        
        return (
          <div
            key={item.id}
            className={`absolute animate-coin-fall ${bgColor}`}
            style={{
              width: item.size,
              height: item.size,
              left: item.left,
              top: '-20px',
              borderRadius: item.type === 'coin' ? '50%' : '2px',
              animationDelay: item.animationDelay,
              transform: `rotate(${item.rotation})`,
              boxShadow: item.type === 'gem' ? '0 0 10px rgba(59, 130, 246, 0.7)' : 
                         item.type === 'coin' ? '0 0 5px rgba(255, 215, 0, 0.7)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingTreasure;
