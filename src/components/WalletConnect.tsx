
import { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet';
import { Button } from './ui/button';
import { Wallet, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { microToStandard } from '../utils/voiUtils';

const WalletConnect = () => {
  const wallet = useWallet();
  const { providers, activeAccount, isReady, connectedActiveAccounts, activeAddress } = wallet;
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = async (providerId: string) => {
    try {
      const provider = providers?.find((p) => p.metadata.id === providerId);
      if (!provider) {
        toast({
          title: "Wallet Error",
          description: `Provider ${providerId} not found`,
          variant: "destructive"
        });
        return;
      }
      
      await provider.connect();
      setIsOpen(false);
      toast({
        title: "Connected!",
        description: "Your wallet has been connected successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
      console.error("Connection error:", error);
    }
  };

  const handleDisconnect = async () => {
    // Use the disconnect method from the wallet object
    if (wallet.disconnect) {
      await wallet.disconnect();
      toast({
        title: "Disconnected",
        description: "Your wallet has been disconnected.",
      });
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isReady) {
    return <div className="flex items-center justify-center py-3">Loading wallet...</div>;
  }

  if (activeAddress) {
    return (
      <div className="bg-pirate-navy border border-pirate-gold rounded-lg p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-pirate-gold">
            <Wallet className="h-5 w-5" />
            <span className="font-pirata">{formatAddress(activeAddress)}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDisconnect} 
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {activeAccount && (
          <div className="text-pirate-parchment text-sm mt-1">
            {activeAccount.amount ? microToStandard(activeAccount.amount) : 0} VOI
          </div>
        )}
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
            {providers?.map((provider) => (
              <Button 
                key={provider.metadata.id}
                onClick={() => handleConnect(provider.metadata.id)}
                className="w-full justify-start"
              >
                {provider.metadata.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
