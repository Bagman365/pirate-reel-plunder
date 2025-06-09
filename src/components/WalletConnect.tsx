import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, Anchor, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { useWallet } from '../providers/WalletProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { PROVIDER_ID } from '@txnlab/use-wallet-react';

const WalletConnect = () => {
  const { isConnected, address, balance, connect, disconnect, activeProvider } = useWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnect = async (providerId: string) => {
    setIsConnecting(true);
    try {
      await connect(providerId);
      setIsOpen(false);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatAddress = () => {
    if (!address) return '';
    // Format address to show first 6 and last 4 characters
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getProviderName = (providerId: string) => {
    switch (providerId) {
      case PROVIDER_ID.DEFLY:
        return 'Defly';
      case PROVIDER_ID.PERA:
        return 'Pera';
      case PROVIDER_ID.LUTE:
        return 'Lute';
      default:
        return 'Wallet';
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case PROVIDER_ID.DEFLY:
        return '/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png'; // VOI icon as placeholder
      case PROVIDER_ID.PERA:
        return '/lovable-uploads/89a339d9-1017-4ae2-819a-a6fae8abf6f1.png'; // Kibisis icon as placeholder
      case PROVIDER_ID.LUTE:
        return '/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png'; // VOI icon as placeholder
      default:
        return '/lovable-uploads/502363b9-38cb-4138-b4ef-cf0b6c6838bb.png';
    }
  };

  if (isConnected) {
    return (
      <div className="bg-pirate-navy/80 backdrop-blur-sm border border-pirate-gold rounded-lg p-3 shadow-lg transition-all duration-300 hover:border-amber-400 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-pirate-gold">
            <Wallet className="h-5 w-5 animate-pulse" />
            <div className="flex flex-col">
              <span className="font-pirata text-lg">{formatAddress()}</span>
              {activeProvider && (
                <span className="text-xs text-pirate-parchment/70">
                  via {getProviderName(activeProvider)}
                </span>
              )}
            </div>
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
                  <X className="h-4 w-4" />
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
            {balance.toFixed(2)} VOI
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              disabled={isConnecting}
              className="bg-pirate-darkwood hover:bg-amber-800 text-pirate-gold font-bold py-3 px-6 rounded-lg border-2 border-pirate-gold font-pirata text-xl w-full h-14 transition-all duration-300 shadow-md hover:shadow-amber-500/30"
              size="lg"
            >
              <Wallet className="mr-2 h-6 w-6" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>⚓ Connect yer wallet to spin for treasure!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <div className="absolute mt-16 z-50 border-2 border-pirate-gold rounded-lg p-4 bg-pirate-navy/95 backdrop-blur-sm shadow-lg min-w-[280px]">
          <div className="text-pirate-gold font-pirata mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <Anchor className="mr-2 h-5 w-5" />
              <span className="text-lg">Select a Treasure Chest</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-pirate-gold hover:text-pirate-gold/80 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => handleConnect(PROVIDER_ID.DEFLY)}
              disabled={isConnecting}
              className="w-full justify-start bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold font-pirata py-3 h-12"
            >
              <img src={getProviderIcon(PROVIDER_ID.DEFLY)} className="w-5 h-5 mr-2" alt="Defly" />
              Defly Wallet
            </Button>
            <Button 
              onClick={() => handleConnect(PROVIDER_ID.PERA)}
              disabled={isConnecting}
              className="w-full justify-start bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold font-pirata py-3 h-12"
            >
              <img src={getProviderIcon(PROVIDER_ID.PERA)} className="w-5 h-5 mr-2" alt="Pera" />
              Pera Wallet
            </Button>
            <Button 
              onClick={() => handleConnect(PROVIDER_ID.LUTE)}
              disabled={isConnecting}
              className="w-full justify-start bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold font-pirata py-3 h-12"
            >
              <img src={getProviderIcon(PROVIDER_ID.LUTE)} className="w-5 h-5 mr-2" alt="Lute" />
              Lute Wallet
            </Button>
          </div>
          <div className="mt-3 text-xs text-pirate-parchment/70 text-center">
            Connect to VOI Network
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;