
import { Map, Skull, Star } from 'lucide-react';

const GameFooter = () => {
  return (
    <footer className="py-4 mt-6">
      <div className="flex justify-around">
        <button className="flex flex-col items-center text-pirate-parchment opacity-70 hover:opacity-100 transition-opacity">
          <Map className="h-6 w-6" />
          <span className="text-xs mt-1 font-pirata">Map</span>
        </button>
        <button className="flex flex-col items-center text-pirate-gold opacity-70 hover:opacity-100 transition-opacity">
          <Star className="h-6 w-6" />
          <span className="text-xs mt-1 font-pirata">Rewards</span>
        </button>
        <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity">
          <Skull className="h-6 w-6" />
          <span className="text-xs mt-1 font-pirata">Achievements</span>
        </button>
      </div>
    </footer>
  );
};

export default GameFooter;
