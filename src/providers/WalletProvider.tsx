
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

interface WalletContextType {
  address: string | null;
  balance: number;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  // State for wallet connection
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(500); // Start with 500 VOI coins
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  // Load wallet from localStorage on startup
  useEffect(() => {
    const savedAddress = localStorage.getItem('wallet_address');
    const savedBalance = localStorage.getItem('wallet_balance');
    
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      
      if (savedBalance) {
        setBalance(Number(savedBalance));
      }
    }
  }, []);
  
  // Save wallet changes to localStorage
  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem('wallet_address', address);
      localStorage.setItem('wallet_balance', balance.toString());
    } else if (!isConnected) {
      localStorage.removeItem('wallet_address');
    }
  }, [isConnected, address, balance]);
  
  // Connect wallet function - simplified version for demo
  const connect = async () => {
    try {
      // In a real implementation, we would connect to an actual wallet here
      // For demo purposes, we're generating a fake address
      const mockAddress = `0x${Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      setAddress(mockAddress);
      setIsConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to blockchain wallet",
      });
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };
  
  // Disconnect wallet function
  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('wallet_balance');
    
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    });
  };
  
  // Update balance function
  const updateBalance = (amount: number) => {
    setBalance(prev => {
      const newBalance = prev + amount;
      localStorage.setItem('wallet_balance', newBalance.toString());
      return newBalance;
    });
  };
  
  // Provide wallet context to children
  return (
    <WalletContext.Provider value={{
      address,
      balance,
      isConnected,
      connect,
      disconnect,
      updateBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook to access wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

export default WalletProvider;
