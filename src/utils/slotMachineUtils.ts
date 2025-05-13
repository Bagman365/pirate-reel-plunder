
import { 
  Anchor, 
  Coins, 
  Gem, 
  Map, 
  Skull, 
  Flag, 
  Star
} from 'lucide-react';
import { ReactNode } from 'react';

// Constants for the slot machine
export const SYMBOLS = ['coin', 'anchor', 'skull', 'map', 'gem', 'parrot', 'rum'];

export const SYMBOL_ICONS: Record<string, ReactNode> = {
  coin: <Coins className="text-pirate-gold" />,
  anchor: <Anchor className="text-gray-400" />,
  skull: <Skull className="text-white" />,
  map: <Map className="text-pirate-parchment" />,
  gem: <Gem className="text-blue-500" />,
  parrot: <Flag className="text-red-500" />,
  rum: <Star className="text-pirate-gold" />
};

// Points for each symbol combination
export const SYMBOL_POINTS: Record<string, number> = {
  coin: 100,
  anchor: 50,
  skull: 75,
  map: 200,
  gem: 150,
  parrot: 125,
  rum: 30
};

// Generate random reels
export const generateRandomReels = (count: number, symbolCount: number) => {
  return Array(count).fill(null).map(() => 
    Array(symbolCount).fill('').map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
  );
};
