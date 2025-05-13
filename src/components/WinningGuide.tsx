
import { 
  Anchor, 
  Coins, 
  Gem, 
  TreasureMap, 
  Skull, 
  Flag, 
  Star 
} from 'lucide-react';

const WinningGuide = () => {
  return (
    <div className="bg-pirate-navy/90 border border-pirate-gold rounded-lg p-4 mt-6">
      <h3 className="font-pirata text-xl text-pirate-gold text-center mb-3">
        Treasure Guide
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Coins className="text-pirate-gold h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = 100 Gold</span>
        </div>
        <div className="flex items-center gap-2">
          <Anchor className="text-gray-400 h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = 50 Gold</span>
        </div>
        <div className="flex items-center gap-2">
          <Skull className="text-white h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = 75 Gold</span>
        </div>
        <div className="flex items-center gap-2">
          <TreasureMap className="text-pirate-parchment h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = Bonus Island</span>
        </div>
        <div className="flex items-center gap-2">
          <Gem className="text-blue-500 h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = 150 Gold</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag className="text-red-500 h-5 w-5" />
          <span className="text-sm text-pirate-parchment">3x = Free Spin</span>
        </div>
      </div>
    </div>
  );
};

export default WinningGuide;
