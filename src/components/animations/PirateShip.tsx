
import { useState, useEffect } from 'react';
import { Ship } from 'lucide-react';

const PirateShip = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const animateShip = () => {
      setPosition(prevPosition => {
        // Change direction when reaching edges
        if (prevPosition > 90) {
          setDirection(-1);
          return 90;
        } else if (prevPosition < 0) {
          setDirection(1);
          return 0;
        }
        return prevPosition + (0.2 * direction);
      });
    };

    const interval = setInterval(animateShip, 100);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div 
      className="fixed z-0 bottom-20 transition-all duration-300 ease-in-out animate-float"
      style={{ left: `${position}%`, transform: direction > 0 ? 'scaleX(1)' : 'scaleX(-1)' }}
    >
      <div className="relative">
        <Ship className="text-gray-800 opacity-30" size={80} />
        <div className="absolute top-0 left-1/2 -ml-1 h-12 w-2 bg-gray-800 opacity-30"></div>
        <div className="absolute top-0 left-1/3 w-14 h-10 bg-gray-800 opacity-30 rounded-t-full"></div>
        <div className="absolute top-[-5px] left-[40%] w-6 h-6 rounded-full opacity-30">
          {/* Skull and crossbones flag */}
          <div className="w-full h-full bg-black rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default PirateShip;
