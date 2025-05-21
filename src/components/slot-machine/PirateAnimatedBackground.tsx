
import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

// Enhanced background component with properly sized and positioned pirate images
const PirateAnimatedBackground = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Add fade-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left side pirate image - larger and better positioned with padding */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
        style={{ width: '25vw', maxWidth: '350px' }}
      >
        <img 
          src="/lovable-uploads/e843e5e7-ed11-4afe-bd2d-5e0a849b3c22.png" 
          alt="Pirate Captain" 
          className="w-full h-auto"
        />
      </div>
      
      {/* Right side slot machine image - larger and better positioned with padding */}
      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
        style={{ width: '25vw', maxWidth: '350px' }}
      >
        <img 
          src="/lovable-uploads/97409236-4d82-4f80-81e6-b865eea29cb8.png" 
          alt="Pirate Slot Machine" 
          className="w-full h-auto"
        />
      </div>

      {/* Mobile view - images stacked below if needed */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4 opacity-30">
          <img 
            src="/lovable-uploads/e843e5e7-ed11-4afe-bd2d-5e0a849b3c22.png" 
            alt="Pirate Captain" 
            className="w-20 h-auto"
          />
          <img 
            src="/lovable-uploads/97409236-4d82-4f80-81e6-b865eea29cb8.png" 
            alt="Pirate Slot Machine" 
            className="w-20 h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default PirateAnimatedBackground;
