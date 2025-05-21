
import { useEffect, useState } from 'react';

// Updated background component with the uploaded pirate images
const PirateAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left side pirate image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
        <img 
          src="/lovable-uploads/e843e5e7-ed11-4afe-bd2d-5e0a849b3c22.png" 
          alt="Pirate Captain" 
          className="w-64 h-auto opacity-60 -ml-10"
        />
      </div>
      
      {/* Right side slot machine image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
        <img 
          src="/lovable-uploads/97409236-4d82-4f80-81e6-b865eea29cb8.png" 
          alt="Pirate Slot Machine" 
          className="w-64 h-auto opacity-60 -mr-10"
        />
      </div>
    </div>
  );
};

export default PirateAnimatedBackground;
