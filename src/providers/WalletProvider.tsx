
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

interface WalletContextType {
  address: string | null;
  balance: number;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: (amount: number) => void;
  signLogicSigTransaction: (txnData: any) => Promise<string | null>;
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
  
  // Connect wallet function - simulated for VOI/Kibisis compatibility
  const connect = async () => {
    try {
      // In a real implementation, this would connect to VOI/Kibisis
      // For now, we're generating a fake VOI address
      const mockAddress = `voi${Array(56).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      setAddress(mockAddress);
      setIsConnected(true);
      
      toast({
        title: "Ahoy! Wallet Connected",
        description: "Successfully connected to yer blockchain treasure chest",
      });
      
      // Record connection in localStorage for leaderboard/stats
      localStorage.setItem('wallet_last_connected', new Date().toISOString());
      
      return mockAddress;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Shiver me timbers!",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
      
      return null;
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
      description: "Ye have cut ties with yer treasure chest",
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
  
  // Simulate signing a logic signature transaction
  // This will be replaced with actual VOI blockchain integration in the future
  const signLogicSigTransaction = async (txnData: any): Promise<string | null> => {
    if (!isConnected || !address) {
      toast({
        title: "No Wallet Connected",
        description: "Connect yer wallet to sign transactions",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock transaction ID
      const txId = `TX_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
      
      // Store transaction in localStorage for history/leaderboard
      const txHistory = JSON.parse(localStorage.getItem('wallet_tx_history') || '[]');
      txHistory.push({
        txId,
        type: txnData.type || 'spin',
        timestamp: Date.now(),
        address,
        data: txnData
      });
      localStorage.setItem('wallet_tx_history', JSON.stringify(txHistory));
      
      console.log("Transaction signed:", txId, txnData);
      return txId;
    } catch (error) {
      console.error("Failed to sign transaction:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to sign the transaction",
        variant: "destructive",
      });
      return null;
    }
  };
  
  // Provide wallet context to children
  return (
    <WalletContext.Provider value={{
      address,
      balance,
      isConnected,
      connect,
      disconnect,
      updateBalance,
      signLogicSigTransaction
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
