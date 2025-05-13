
import { Button } from '../ui/button';

interface BetAmountSelectorProps {
  betAmount: number;
  onBetChange: (amount: number) => void;
  disabled: boolean;
}

const BetAmountSelector = ({ betAmount, onBetChange, disabled }: BetAmountSelectorProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between bg-pirate-darkwood rounded p-2">
        <span className="text-pirate-gold font-pirata">Bet Amount:</span>
        <div className="flex items-center">
          <Button 
            variant="ghost"
            className="text-pirate-gold h-8 w-8 p-0" 
            onClick={() => onBetChange(Math.max(betAmount - 1, 0.1))}
            disabled={betAmount <= 0.1 || disabled}
          >
            -
          </Button>
          <span className="text-pirate-gold font-pirata mx-2">
            {betAmount} VOI
          </span>
          <Button 
            variant="ghost"
            className="text-pirate-gold h-8 w-8 p-0" 
            onClick={() => onBetChange(Math.min(betAmount + 1, 100))}
            disabled={betAmount >= 100 || disabled}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BetAmountSelector;
