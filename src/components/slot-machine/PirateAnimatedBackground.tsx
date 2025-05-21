import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

// Background component without the pirate images
const PirateAnimatedBackground = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Add fade-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Removed pirate images */}
    </div>
  );
};

export default PirateAnimatedBackground;
