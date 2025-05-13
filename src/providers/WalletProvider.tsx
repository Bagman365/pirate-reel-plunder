
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
      nodeConfig={{
        network: activeNetwork.name,
        nodeServer: activeNetwork.algodServer,
        nodePort: activeNetwork.algodPort,
        nodeToken: activeNetwork.algodToken,
        genesisHash: activeNetwork.genesisHash,
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
