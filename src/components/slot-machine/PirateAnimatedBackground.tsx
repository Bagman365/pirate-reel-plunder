
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
}

const PirateAnimatedBackground = () => {
  const [images, setImages] = useState<AnimatedImage[]>([]);
  
  useEffect(() => {
    // Create animated background images
    const pirateShip = "/lovable-uploads/82bef45e-a71c-4a71-8059-92c524f988a7.png";
    const pirateSwinging = "/lovable-uploads/89a339d9-1017-4ae2-819a-a6fae8abf6f1.png";
    const treasureChest = "/lovable-uploads/6d521ae6-3f7e-446d-8a83-d8ca4a9cf045.png";
    
    const backgroundImages: AnimatedImage[] = [
      {
        id: 1,
        src: pirateShip,
        left: '5%',
        top: '15%',
        animationDelay: '0s',
        animationDuration: '15s',
        rotate: '5deg',
        scale: '0.6'
      },
      {
        id: 2,
        src: pirateSwinging,
        left: '75%',
        top: '20%',
        animationDelay: '2s',
        animationDuration: '12s',
        rotate: '-5deg',
        scale: '0.5'
      },
      {
        id: 3,
        src: treasureChest,
        left: '50%',
        top: '85%',
        animationDelay: '4s',
        animationDuration: '10s',
        rotate: '0deg',
        scale: '0.4'
      }
    ];
    
    setImages(backgroundImages);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {images.map((image) => (
        <div
          key={image.id}
          className="absolute animate-float opacity-20 transition-opacity duration-300 hover:opacity-30"
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
            className="max-w-[120px] h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default PirateAnimatedBackground;
