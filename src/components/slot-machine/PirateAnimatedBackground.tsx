
import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

// Background component with the pirate treasure image spanning the full background
const PirateAnimatedBackground = ({ image = "/lovable-uploads/0ea1aacf-d873-4032-a6aa-e8fa6f8106cd.png" }) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Add fade-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Background pirate treasure image - spanning the entire background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          zIndex: 5
        }}
      >
        <img 
          src={image} 
          alt="Pirates Background" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PirateAnimatedBackground;
