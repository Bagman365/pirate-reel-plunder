
import { Button } from '../ui/button';
import MachineLever from './MachineLever';
import { RefObject } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Wallet } from 'lucide-react';

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
  const isDisabled = !canSpin || spinning || isProcessing || !activeAddress;
  
  return (
    <div className="flex justify-between items-center">
      {/* Left side - Lever */}
      <MachineLever leverRef={leverRef} onClick={onPullLever} />
      
      {/* Right side - Spin button */}
      <div className="flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  onClick={onPullLever}
                  disabled={isDisabled}
                  className={`bg-pirate-gold hover:bg-amber-500 text-pirate-navy font-bold py-2 px-6 rounded border-2 border-pirate-darkwood font-pirata text-xl ${isDisabled && !activeAddress ? 'opacity-50' : ''}`}
                >
                  {isProcessing ? "Processing..." : spinning ? "Spinning..." : "SPIN"}
                  {!activeAddress && <Wallet className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </TooltipTrigger>
            {!activeAddress && (
              <TooltipContent side="top">
                <p>⚓ Ahoy! Connect yer wallet to spin for treasure.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
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
