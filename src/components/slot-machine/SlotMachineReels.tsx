
import { SYMBOL_ICONS } from '../../utils/slotMachineUtils';

interface SlotMachineReelsProps {
  reels: string[][];
  results: string[];
  spinning: boolean;
  showWin: boolean;
}

const SlotMachineReels = ({ reels, results, spinning, showWin }: SlotMachineReelsProps) => {
  return (
    <div className="flex justify-center mb-6 gap-2 bg-black p-2 rounded-lg border-2 border-pirate-gold overflow-hidden">
      {reels.map((reel, reelIndex) => (
        <div key={reelIndex} className="relative w-1/3 h-20 overflow-hidden border border-pirate-gold rounded bg-gray-900">
          <div 
            className={`absolute w-full transition-transform duration-1000 ${spinning ? 'animate-spin-reel' : ''}`}
            style={{ 
              transform: results[reelIndex] && !spinning ? 'translateY(-120px)' : 'translateY(0px)'
            }}
          >
            {reel.map((symbol, symbolIndex) => (
              <div 
                key={`${reelIndex}-${symbolIndex}`} 
                className="h-20 flex items-center justify-center text-4xl"
              >
                {SYMBOL_ICONS[symbol]}
              </div>
            ))}
          </div>
          
          {/* Result highlight box */}
          {results[reelIndex] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-full h-20 flex items-center justify-center text-4xl ${
                showWin ? 'bg-yellow-300/20' : ''
              }`}>
                {SYMBOL_ICONS[results[reelIndex]]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SlotMachineReels;
