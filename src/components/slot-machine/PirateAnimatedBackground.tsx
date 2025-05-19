
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
    const pirateShip = "/lovable-uploads/82bef45e-a71c-4a71-8059-92c524f988a7.png";
    const pirateSwinging = "/lovable-uploads/89a339d9-1017-4ae2-819a-a6fae8abf6f1.png";
    const treasureChest = "/lovable-uploads/6d521ae6-3f7e-446d-8a83-d8ca4a9cf045.png";
    
    // New images
    const pirateRope = "/lovable-uploads/fc671c07-1fbc-4793-a443-7811f75e7c6e.png";
    const sailingShip = "/lovable-uploads/4ccd7821-5395-4b07-b337-34b5f9b53a99.png";
    const pirateSymbol = "/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png";
    
    const backgroundImages: AnimatedImage[] = [
      {
        id: 1,
        src: pirateShip,
        left: '5%',
        top: '15%',
        animationDelay: '0s',
        animationDuration: '15s',
        rotate: '5deg',
        scale: '0.9'  // Increased by 150% from 0.6
      },
      {
        id: 2,
        src: pirateSwinging,
        left: '75%',
        top: '20%',
        animationDelay: '2s',
        animationDuration: '12s',
        rotate: '-5deg',
        scale: '0.75'  // Increased by 150% from 0.5
      },
      {
        id: 3,
        src: treasureChest,
        left: '50%',
        top: '85%',
        animationDelay: '4s',
        animationDuration: '10s',
        rotate: '0deg',
        scale: '0.6'  // Increased by 150% from 0.4
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
        scale: '0.75',  // Increased by 150% from 0.5
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
        scale: '1.05',  // Increased by 150% from 0.7
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
        scale: '0.6',  // Increased by 150% from 0.4
        animationClass: 'animate-pulse-glow'
      }
    ];
    
    setImages(backgroundImages);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
            className="max-w-[225px] h-auto" // Increased by 150% from 150px
          />
        </div>
      ))}
    </div>
  );
};

export default PirateAnimatedBackground;
