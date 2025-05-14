
import { WalletProvider as UseWalletProvider } from '@txnlab/use-wallet';
import { ReactNode } from 'react';
import { NETWORK, DEFAULT_NETWORK } from '../config/blockchain';

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const activeNetwork = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK];
  
  return (
    <UseWalletProvider
      clientStatic={{
        network: activeNetwork.name,
        algod: {
          server: activeNetwork.algodServer,
          port: activeNetwork.algodPort,
          token: activeNetwork.algodToken,
        },
        indexer: {
          server: activeNetwork.indexerServer || '',
          port: '',  // Use empty string instead of activeNetwork.indexerPort
          token: '',
        },
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
