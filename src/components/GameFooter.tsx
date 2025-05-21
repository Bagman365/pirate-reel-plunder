
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const GameFooter = () => {
  return (
    <footer className="mt-8 pb-6 relative z-10 flex justify-center">
      <div className="bg-pirate-darkwood/80 rounded-lg p-4 border-t border-pirate-gold/30 w-full max-w-[540px] mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="ghost" asChild className="text-pirate-gold hover:bg-pirate-gold/20 hover:text-pirate-gold">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="text-pirate-gold hover:bg-pirate-gold/20 hover:text-pirate-gold">
            <Link to="/stats">Stats</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-xs text-pirate-gold/60">
          © 2025 Pirate Slots • VOI Blockchain
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;
