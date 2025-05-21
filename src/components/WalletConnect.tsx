
import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, Anchor } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { useWallet } from '../providers/WalletProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const WalletConnect = () => {
  const { isConnected, address, balance, connect, disconnect } = useWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleConnect = async () => {
    await connect();
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatAddress = () => {
    if (!address) return '';
    // Handle both VOI and ETH-style addresses
    if (address.startsWith('voi')) {
      return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
    }
    // Format address to show first 6 and last 4 characters
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isConnected) {
    return (
      <div className="bg-pirate-navy/80 backdrop-blur-sm border border-pirate-gold rounded-lg p-3 shadow-lg transition-all duration-300 hover:border-amber-400 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-pirate-gold">
            <Wallet className="h-5 w-5 animate-pulse" />
            <span className="font-pirata text-lg">{formatAddress()}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDisconnect} 
                  className="text-red-500 hover:text-red-700"
                >
                  <span className="sr-only">Disconnect</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Abandon ship (disconnect)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center mt-2">
          <img src="/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png" className="w-5 h-5 mr-2" alt="VOI" />
          <span className="text-pirate-parchment text-sm font-medium">
            {balance} VOI
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              className="bg-pirate-darkwood hover:bg-amber-800 text-pirate-gold font-bold py-2 px-4 rounded border-2 border-pirate-gold font-pirata w-full"
              size="sm"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>⚓ Connect yer wallet to spin for treasure!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <div className="absolute mt-10 z-50 border border-pirate-gold rounded-md p-3 bg-pirate-navy/90 backdrop-blur-sm shadow-lg">
          <div className="text-pirate-gold font-pirata mb-2 flex items-center">
            <Anchor className="mr-2 h-5 w-5" />
            <span>Select a Treasure Chest</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleConnect}
              className="w-full justify-start bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold font-pirata"
            >
              <img src="/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png" className="w-5 h-5 mr-2" alt="VOI" />
              VOI Wallet
            </Button>
            <Button 
              onClick={handleConnect}
              className="w-full justify-start bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold font-pirata"
            >
              <img src="/lovable-uploads/89a339d9-1017-4ae2-819a-a6fae8abf6f1.png" className="w-5 h-5 mr-2" alt="Kibisis" />
              Kibisis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
