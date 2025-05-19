
import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(500); // Start with 500 coins
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleConnect = () => {
    setIsConnected(true);
    setIsOpen(false);
    toast({
      title: "Connected!",
      description: "Welcome to Pirate Slots!",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Come back soon, matey!",
    });
  };

  const formatAddress = () => {
    // Generate a fake wallet address for UI purposes
    return '0xABC1...XYZ9';
  };

  if (isConnected) {
    return (
      <div className="bg-pirate-navy border border-pirate-gold rounded-lg p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-pirate-gold">
            <Wallet className="h-5 w-5" />
            <span className="font-pirata">{formatAddress()}</span>
          </div>
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
        </div>
        <div className="text-pirate-parchment text-sm mt-1">
          {balance} VOI
        </div>
      </div>
    );
  }

  return (
    <div className="my-2">
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-pirate-gold hover:bg-amber-500 text-pirate-navy font-bold py-2 px-4 rounded border-2 border-pirate-darkwood font-pirata"
      >
        <Wallet className="mr-2 h-5 w-5" />
        Connect Wallet
      </Button>

      {isOpen && (
        <div className="mt-2 border border-pirate-gold rounded-md p-3 bg-pirate-navy">
          <div className="text-pirate-gold font-pirata mb-2">Select a Wallet</div>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleConnect}
              className="w-full justify-start"
            >
              Pirate Wallet
            </Button>
            <Button 
              onClick={handleConnect}
              className="w-full justify-start"
            >
              Treasure Chest
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
