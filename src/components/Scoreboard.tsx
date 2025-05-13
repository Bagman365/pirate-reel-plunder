
import { Coins } from 'lucide-react';

interface ScoreboardProps {
  coins: number;
}

const Scoreboard = ({ coins }: ScoreboardProps) => {
  return (
    <div className="bg-pirate-darkwood border-2 border-pirate-gold rounded-lg p-2 flex items-center justify-center mb-4 shadow-md">
      <div className="flex items-center gap-2">
        <Coins className="text-pirate-gold h-6 w-6" />
        <span className="font-pirata text-2xl text-pirate-gold">
          {coins} <span className="text-lg">Gold</span>
        </span>
      </div>
    </div>
  );
};

export default Scoreboard;
