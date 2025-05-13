
import { Button } from '../ui/button';
import MachineLever from './MachineLever';
import { RefObject } from 'react';

interface SlotMachineControlsProps {
  leverRef: RefObject<HTMLDivElement>;
  onPullLever: () => void;
  onClaim: () => void;
  canSpin: boolean;
  spinning: boolean;
  isProcessing: boolean;
  activeAddress: string | undefined;
  currentBetKey: string | null;
}

const SlotMachineControls = ({ 
  leverRef, 
  onPullLever, 
  onClaim, 
  canSpin, 
  spinning, 
  isProcessing, 
  activeAddress,
  currentBetKey
}: SlotMachineControlsProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Left side - Lever */}
      <MachineLever leverRef={leverRef} onClick={onPullLever} />
      
      {/* Right side - Spin button */}
      <div className="flex flex-col gap-2">
        <Button 
          onClick={onPullLever}
          disabled={!canSpin || spinning || isProcessing || !activeAddress}
          className="bg-pirate-gold hover:bg-amber-500 text-pirate-navy font-bold py-2 px-6 rounded border-2 border-pirate-darkwood font-pirata text-xl"
        >
          {isProcessing ? "Processing..." : spinning ? "Spinning..." : "SPIN"}
        </Button>
        
        {currentBetKey && (
          <Button
            onClick={onClaim}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded border-2 border-pirate-darkwood font-pirata text-sm"
          >
            {isProcessing ? "Processing..." : "Claim Winnings"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SlotMachineControls;
