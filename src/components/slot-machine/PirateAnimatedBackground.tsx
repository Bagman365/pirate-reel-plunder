
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
      {/* Left side pirate image - 60% larger with animation */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
        style={{ width: '40vw', maxWidth: '560px' }}
      >
        <img 
          src="/lovable-uploads/b760e77d-f657-4f34-a43e-8357f2cb1e73.png" 
          alt="Pirates with Treasure" 
          className="w-full h-auto animate-float hover:animate-bounce-subtle"
        />
      </div>
      
      {/* Right side pirate captain image - 60% larger with animation */}
      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
        style={{ width: '40vw', maxWidth: '560px' }}
      >
        <img 
          src="/lovable-uploads/304c2fa2-0cc0-48fb-8ada-9a36bf2c9a5b.png" 
          alt="Pirate Captain" 
          className="w-full h-auto animate-swing"
        />
      </div>

      {/* Mobile view - images stacked below if needed */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4 opacity-30">
          <img 
            src="/lovable-uploads/b760e77d-f657-4f34-a43e-8357f2cb1e73.png" 
            alt="Pirates with Treasure" 
            className="w-32 h-auto animate-float"
          />
          <img 
            src="/lovable-uploads/304c2fa2-0cc0-48fb-8ada-9a36bf2c9a5b.png" 
            alt="Pirate Captain" 
            className="w-32 h-auto animate-swing"
          />
        </div>
      )}
    </div>
  );
};

export default PirateAnimatedBackground;
