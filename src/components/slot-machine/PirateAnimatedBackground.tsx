
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

  // Left side image (pirate with coins)
  const leftImage = "/lovable-uploads/871c999c-f9cc-4007-8d34-a71ebaf0f9c1.png";
  // Right side image (pirate captain)
  const rightImage = "/lovable-uploads/d3ed5fde-c751-4ff3-812a-275e528a2bcd.png";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left side images - 4 copies of the pirate with coins */}
      <div className="absolute left-0 top-0 bottom-0 hidden md:flex flex-col justify-between py-8">
        {[...Array(4)].map((_, index) => (
          <div 
            key={`left-${index}`}
            className={`transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
            style={{ width: '20vw', maxWidth: '250px' }}
          >
            <img 
              src={leftImage}
              alt={`Pirate Treasure ${index+1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      
      {/* Right side images - 3 copies of the pirate captain */}
      <div className="absolute right-0 top-0 bottom-0 hidden md:flex flex-col justify-between py-10">
        {[...Array(3)].map((_, index) => (
          <div 
            key={`right-${index}`}
            className={`transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'} px-4`}
            style={{ width: '20vw', maxWidth: '250px' }}
          >
            <img 
              src={rightImage} 
              alt={`Pirate Captain ${index+1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {/* Mobile view - smaller versions of both images */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4 opacity-30">
          <img 
            src={leftImage} 
            alt="Pirate Treasure" 
            className="w-20 h-auto"
          />
          <img 
            src={rightImage} 
            alt="Pirate Captain" 
            className="w-20 h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default PirateAnimatedBackground;
