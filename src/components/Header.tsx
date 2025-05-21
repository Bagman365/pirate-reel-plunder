
import { Anchor } from 'lucide-react';

const Header = () => {
  return (
    <header className="pt-6 pb-4 px-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Anchor className="h-8 w-8 text-pirate-gold" />
          <h1 className="font-pirata text-4xl text-pirate-gold pirate-text-shadow">
            Pirate Plunder
          </h1>
          <Anchor className="h-8 w-8 text-pirate-gold" />
        </div>
      </div>
      <p className="text-center text-pirate-parchment text-sm mt-1 font-medium italic">
        "Spin the cursed reels, farm that yield, and make off with the on-chain booty."
      </p>
    </header>
  );
};

export default Header;
