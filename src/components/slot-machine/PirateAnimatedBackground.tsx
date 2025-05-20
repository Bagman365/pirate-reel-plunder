
import { useEffect, useState } from 'react';

interface AnimatedImage {
  id: number;
  src: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  rotate: string;
  scale: string;
  animationClass?: string;
}

const PirateAnimatedBackground = () => {
  const [images, setImages] = useState<AnimatedImage[]>([]);
  
  useEffect(() => {
    // Original background images
    const pirateSwinging = "/lovable-uploads/89a339d9-1017-4ae2-819a-a6fae8abf6f1.png";
    const treasureChest = "/lovable-uploads/6d521ae6-3f7e-446d-8a83-d8ca4a9cf045.png";
    
    // New images
    const pirateRope = "/lovable-uploads/fc671c07-1fbc-4793-a443-7811f75e7c6e.png";
    const sailingShip = "/lovable-uploads/4ccd7821-5395-4b07-b337-34b5f9b53a99.png";
    const pirateSymbol = "/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png";
    const mainShipOutline = "/lovable-uploads/c27476fc-30af-410c-9c1d-d5cb378d02cc.png";
    
    const backgroundImages: AnimatedImage[] = [
      // Removed pirate ship image with id: 1
      {
        id: 2,
        src: pirateSwinging,
        left: '75%',
        top: '20%',
        animationDelay: '2s',
        animationDuration: '12s',
        rotate: '-5deg',
        scale: '0.75'
      },
      {
        id: 3,
        src: treasureChest,
        left: '50%',
        top: '85%',
        animationDelay: '4s',
        animationDuration: '10s',
        rotate: '0deg',
        scale: '0.6'
      },
      // New animated images
      {
        id: 4,
        src: pirateRope,
        left: '15%',
        top: '60%',
        animationDelay: '1s',
        animationDuration: '8s',
        rotate: '0deg',
        scale: '0.75',
        animationClass: 'animate-swing'
      },
      {
        id: 5,
        src: sailingShip,
        left: '80%',
        top: '70%',
        animationDelay: '3s',
        animationDuration: '20s',
        rotate: '-5deg',
        scale: '1.05',
        animationClass: 'animate-sail'
      },
      {
        id: 6,
        src: pirateSymbol,
        left: '25%',
        top: '30%',
        animationDelay: '2s',
        animationDuration: '6s',
        rotate: '0deg',
        scale: '0.6',
        animationClass: 'animate-pulse-glow'
      },
      // Add the newly uploaded ship outline as a prominent background element
      {
        id: 7,
        src: mainShipOutline,
        left: '50%',
        top: '50%',
        animationDelay: '0s',
        animationDuration: '30s',
        rotate: '0deg',
        scale: '1.5',  // Larger size for this main ship
        animationClass: 'animate-float'
      }
    ];
    
    setImages(backgroundImages);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Add a semi-transparent large ship silhouette in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/lovable-uploads/c27476fc-30af-410c-9c1d-d5cb378d02cc.png"
          alt="Ship silhouette"
          className="w-full h-full object-contain opacity-10 max-w-3xl"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))' }}
        />
      </div>

      {images.map((image) => (
        <div
          key={image.id}
          className={`absolute transition-all duration-500 ${image.animationClass || 'animate-float'} opacity-20 hover:opacity-40`}
          style={{
            left: image.left,
            top: image.top,
            animationDelay: image.animationDelay,
            animationDuration: image.animationDuration,
            transform: `rotate(${image.rotate}) scale(${image.scale})`,
          }}
        >
          <img 
            src={image.src} 
            alt="Pirate decoration" 
            className="max-w-[225px] h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default PirateAnimatedBackground;
