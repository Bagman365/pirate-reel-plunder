
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useWallet } from '../../providers/WalletProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Wallet } from 'lucide-react';

interface SlotMachineStatusProps {
  isProcessing: boolean;
  isConnected: boolean;
}

const SlotMachineStatus = ({ isProcessing, isConnected }: SlotMachineStatusProps) => {
  const { balance } = useWallet();
  
  return (
    <>
      {/* Status bar with balance and stats link */}
      <div className="relative z-10 mb-4 bg-pirate-darkwood/80 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between shadow-lg border border-pirate-darkwood">
        <div className="flex items-center">
          <img src="/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png" className="w-6 h-6 mr-2" alt="VOI" />
          <span className="font-pirata text-xl text-pirate-gold">
            {isConnected ? (
              `Balance: ${balance} VOI`
            ) : (
              <div className="flex items-center">
                <span className="text-pirate-gold/50">Connect wallet to see balance</span>
                <Wallet className="ml-2 h-4 w-4 text-pirate-gold/50" />
              </div>
            )}
          </span>
        </div>
        <Button variant="link" asChild className="text-pirate-gold p-0 h-auto hover:text-pirate-gold/80">
          <Link to="/stats">View Stats</Link>
        </Button>
      </div>
      
      {/* Processing Status */}
      {isProcessing && (
        <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
          <span className="text-pirate-gold font-pirata animate-pulse">Processing VOI Blockchain Transaction...</span>
        </div>
      )}
      
      {/* Wallet connection notice */}
      {!isConnected && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-4 p-3 bg-pirate-darkwood/70 rounded-lg text-center border border-pirate-gold/50 cursor-help">
                <span className="text-pirate-gold font-pirata flex items-center justify-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  ⚓ Ahoy! Connect yer wallet to spin for treasure!
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click the Connect Wallet button above to start playing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default SlotMachineStatus;
