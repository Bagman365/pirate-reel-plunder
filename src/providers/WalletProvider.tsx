
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
      value={{
        nodeConfig: {
          network: activeNetwork.name,
          nodeServer: activeNetwork.algodServer,
          nodePort: activeNetwork.algodPort,
          nodeToken: activeNetwork.algodToken,
          indexerServer: activeNetwork.indexerServer || '',
          indexerPort: activeNetwork.algodPort, // Use algodPort as fallback
          indexerToken: activeNetwork.algodToken,
        },
        providers: {},
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
