
import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

interface TreasureChestProps {
  isOpen: boolean;
}

const TreasureChest = ({ isOpen }: TreasureChestProps) => {
  const [coinsVisible, setCoinsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCoinsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCoinsVisible(false);
    }
  }, [isOpen]);

  return (
    <div className="fixed z-10 bottom-5 right-5 transition-all duration-500">
      <div className={`relative w-20 h-16 ${isOpen ? 'scale-110' : ''} transition-transform duration-500`}>
        {/* Chest base */}
        <div className="absolute bottom-0 w-full h-10 bg-pirate-wood rounded-md border-2 border-pirate-darkwood"></div>
        
        {/* Chest lid */}
        <div 
          className={`absolute bottom-8 w-full h-6 bg-pirate-wood rounded-t-md border-2 border-pirate-darkwood transition-transform duration-500 origin-bottom ${
            isOpen ? 'transform -rotate-60' : ''
          }`}
        ></div>
        
        {/* Lock */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pirate-gold rounded-sm border border-pirate-darkwood"></div>
        
        {/* Coins */}
        {coinsVisible && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Coins className="text-pirate-gold animate-bounce" size={16} />
              <Coins className="absolute -left-4 -top-2 text-pirate-gold animate-bounce" style={{animationDelay: '0.1s'}} size={16} />
              <Coins className="absolute left-4 -top-1 text-pirate-gold animate-bounce" style={{animationDelay: '0.2s'}} size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureChest;
