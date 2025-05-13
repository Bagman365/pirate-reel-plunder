
import { WalletProvider as UseWalletProvider } from '@txnlab/use-wallet';
import { ReactNode } from 'react';
import { NETWORK, DEFAULT_NETWORK } from '../config/blockchain';

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const activeNetwork = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK];
  
  // Define providers without using PROVIDER_ID enum
  const walletProviders = [
    { id: 'kibisis' },
    { id: 'lute' },
    { id: 'defly' },
    { id: 'walletconnect' }
  ];

  return (
    <UseWalletProvider
      providers={walletProviders}
      // Use clientStatic instead of nodeConfig
      clientStatic={{
        network: activeNetwork.name,
        algod: {
          server: activeNetwork.algodServer,
          port: activeNetwork.algodPort,
          token: activeNetwork.algodToken,
        },
        indexer: {
          server: activeNetwork.indexerServer || '',
          port: activeNetwork.indexerPort || '',
          token: '',
        },
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
