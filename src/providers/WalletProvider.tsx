import React, { ReactNode, createContext, useContext, useEffect } from 'react';
import { WalletProvider as UseWalletProvider, useWallet as useWalletHook, PROVIDER_ID } from '@txnlab/use-wallet-react';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { PeraWalletConnect } from '@perawallet/connect';
import LuteConnect from 'lute-connect';
import { toast } from '../hooks/use-toast';

// VOI Network configuration
const VOI_NETWORK_CONFIG = {
  id: 'voi-testnet',
  genesisId: 'voitest-v1',
  genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',
  name: 'VOI TestNet',
  algod: {
    server: 'https://testnet-api.voi.nodly.io',
    port: 443,
    token: '',
    headers: {}
  },
  indexer: {
    server: 'https://testnet-idx.voi.nodly.io',
    port: 443,
    token: '',
    headers: {}
  }
};

// Wallet providers configuration
const walletProviders = [
  {
    id: PROVIDER_ID.DEFLY,
    clientStatic: DeflyWalletConnect,
    getDynamicClient: null
  },
  {
    id: PROVIDER_ID.PERA,
    clientStatic: PeraWalletConnect,
    getDynamicClient: null
  },
  {
    id: PROVIDER_ID.LUTE,
    clientStatic: LuteConnect,
    getDynamicClient: null
  }
];

interface ExtendedWalletContextType {
  address: string | null;
  balance: number;
  isConnected: boolean;
  connect: (providerId?: string) => Promise<string | null>;
  disconnect: () => void;
  updateBalance: (amount: number) => void;
  signLogicSigTransaction: (txnData: any) => Promise<string | null>;
  activeProvider: string | null;
}

const ExtendedWalletContext = createContext<ExtendedWalletContextType | undefined>(undefined);

type WalletProviderProps = {
  children: ReactNode;
};

// Inner component that uses the wallet hook
const WalletProviderInner = ({ children }: WalletProviderProps) => {
  const { providers, activeAccount, signTransactions, getAccountInfo } = useWalletHook();
  const [balance, setBalance] = React.useState<number>(500); // Start with 500 VOI
  const [activeProvider, setActiveProvider] = React.useState<string | null>(null);

  // Get current address
  const address = activeAccount?.address || null;
  const isConnected = !!activeAccount;

  // Load balance from localStorage on startup
  React.useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    if (savedBalance && isConnected) {
      setBalance(Number(savedBalance));
    }
  }, [isConnected]);

  // Save balance changes to localStorage
  React.useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem('wallet_address', address);
      localStorage.setItem('wallet_balance', balance.toString());
    } else if (!isConnected) {
      localStorage.removeItem('wallet_address');
    }
  }, [isConnected, address, balance]);

  // Fetch real balance from blockchain
  const fetchBalance = React.useCallback(async () => {
    if (!activeAccount) return;
    
    try {
      const accountInfo = await getAccountInfo(activeAccount.address);
      if (accountInfo) {
        // Convert microVOI to VOI (1 VOI = 1,000,000 microVOI)
        const voiBalance = accountInfo.amount / 1_000_000;
        setBalance(voiBalance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Keep using local balance if blockchain fetch fails
    }
  }, [activeAccount, getAccountInfo]);

  // Fetch balance when account changes
  React.useEffect(() => {
    if (isConnected) {
      fetchBalance();
    }
  }, [isConnected, fetchBalance]);

  // Connect wallet function
  const connect = async (providerId?: string): Promise<string | null> => {
    try {
      // If no provider specified, try to connect to the first available one
      const targetProvider = providerId || Object.keys(providers)[0];
      
      if (!providers[targetProvider]) {
        throw new Error(`Provider ${targetProvider} not available`);
      }

      const provider = providers[targetProvider];
      await provider.connect();
      
      setActiveProvider(targetProvider);
      
      toast({
        title: "Ahoy! Wallet Connected",
        description: `Successfully connected to ${targetProvider} wallet`,
      });
      
      // Record connection in localStorage for stats
      localStorage.setItem('wallet_last_connected', new Date().toISOString());
      localStorage.setItem('wallet_provider', targetProvider);
      
      return provider.accounts[0]?.address || null;
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
    try {
      if (activeProvider && providers[activeProvider]) {
        providers[activeProvider].disconnect();
      }
      
      setActiveProvider(null);
      localStorage.removeItem('wallet_address');
      localStorage.removeItem('wallet_balance');
      localStorage.removeItem('wallet_provider');
      
      toast({
        title: "Wallet Disconnected",
        description: "Ye have cut ties with yer treasure chest",
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  // Update balance function (for game mechanics)
  const updateBalance = (amount: number) => {
    setBalance(prev => {
      const newBalance = Math.max(0, prev + amount); // Prevent negative balance
      localStorage.setItem('wallet_balance', newBalance.toString());
      return newBalance;
    });
  };

  // Sign logic signature transaction
  const signLogicSigTransaction = async (txnData: any): Promise<string | null> => {
    if (!isConnected || !address || !activeProvider) {
      toast({
        title: "No Wallet Connected",
        description: "Connect yer wallet to sign transactions",
        variant: "destructive",
      });
      return null;
    }

    try {
      // For now, we'll simulate the transaction signing
      // In a real implementation, you would create actual Algorand transactions here
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock transaction ID
      const txId = `VOI_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
      
      // Store transaction in localStorage for history
      const txHistory = JSON.parse(localStorage.getItem('wallet_tx_history') || '[]');
      txHistory.push({
        txId,
        type: txnData.type || 'spin',
        timestamp: Date.now(),
        address,
        data: txnData,
        provider: activeProvider
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
    <ExtendedWalletContext.Provider value={{
      address,
      balance,
      isConnected,
      connect,
      disconnect,
      updateBalance,
      signLogicSigTransaction,
      activeProvider
    }}>
      {children}
    </ExtendedWalletContext.Provider>
  );
};

// Main wallet provider component
export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <UseWalletProvider
      value={{
        networks: [VOI_NETWORK_CONFIG],
        providers: walletProviders
      }}
    >
      <WalletProviderInner>
        {children}
      </WalletProviderInner>
    </UseWalletProvider>
  );
};

// Hook to access wallet context
export const useWallet = () => {
  const context = useContext(ExtendedWalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

export default WalletProvider;