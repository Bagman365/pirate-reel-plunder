
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
        network: activeNetwork.name,
        algodConfig: {
          server: activeNetwork.algodServer,
          port: activeNetwork.algodPort,
          token: activeNetwork.algodToken
        },
        indexerConfig: {
          server: activeNetwork.indexerServer || '',
          port: activeNetwork.algodPort || '',
          token: activeNetwork.algodToken || ''
        }
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
