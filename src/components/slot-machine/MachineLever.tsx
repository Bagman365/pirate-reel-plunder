
import { RefObject } from 'react';

interface MachineLeverProps {
  leverRef: RefObject<HTMLDivElement>;
  onClick: () => void;
}

const MachineLever = ({ leverRef, onClick }: MachineLeverProps) => {
  return (
    <div 
      ref={leverRef}
      className="w-16 h-20 flex flex-col items-center cursor-pointer transform origin-bottom transition-transform"
      onClick={onClick}
    >
      <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-pirate-gold"></div>
      <div className="w-4 h-16 bg-pirate-wood rounded-b-lg border-x-2 border-b-2 border-pirate-darkwood"></div>
    </div>
  );
};

export default MachineLever;
