
import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

// Background component with the pirate treasure image
const PirateAnimatedBackground = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Add fade-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background pirate treasure image - placed at the bottom center */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
        style={{ 
          width: isMobile ? '100%' : '85%',
          maxWidth: '850px',
          zIndex: -1
        }}
      >
        <img 
          src="/lovable-uploads/da26c83d-a4ce-4299-aa33-956d26962ef1.png" 
          alt="Pirates with Treasure" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PirateAnimatedBackground;
