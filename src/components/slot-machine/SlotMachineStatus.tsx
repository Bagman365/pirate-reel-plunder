
import { useWallet } from '../../providers/WalletProvider';

interface SlotMachineStatusProps {
  isProcessing: boolean;
  isConnected: boolean;
}

const SlotMachineStatus = ({ isProcessing, isConnected }: SlotMachineStatusProps) => {
  const { balance } = useWallet();
  
  return (
    <>
      {/* Balance display */}
      <div className="relative z-10 mb-4 bg-pirate-darkwood/80 rounded-lg p-2 text-center">
        <span className="font-pirata text-xl text-pirate-gold">Balance: {balance} VOI</span>
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
