
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useWallet } from '../../providers/WalletProvider';

interface SlotMachineStatusProps {
  isProcessing: boolean;
  isConnected: boolean;
}

const SlotMachineStatus = ({ isProcessing, isConnected }: SlotMachineStatusProps) => {
  const { balance } = useWallet();
  
  return (
    <>
      {/* Status bar with balance and stats link */}
      <div className="relative z-10 mb-4 bg-pirate-darkwood/80 rounded-lg p-2 flex items-center justify-between">
        <span className="font-pirata text-xl text-pirate-gold">Balance: {balance} VOI</span>
        <Button variant="link" asChild className="text-pirate-gold p-0 h-auto hover:text-pirate-gold/80">
          <Link to="/stats">View Stats</Link>
        </Button>
      </div>
      
      {/* Processing Status */}
      {isProcessing && (
        <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
          <span className="text-pirate-gold font-pirata animate-pulse">Processing Blockchain Transaction...</span>
        </div>
      )}
      
      {/* Wallet connection notice */}
      {!isConnected && (
        <div className="mt-4 p-2 bg-pirate-darkwood/50 rounded text-center">
          <span className="text-pirate-gold font-pirata">Connect your wallet to play!</span>
        </div>
      )}
    </>
  );
};

export default SlotMachineStatus;
