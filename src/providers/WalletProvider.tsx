
import { PROVIDER_ID, WalletProvider as UseWalletProvider } from '@txnlab/use-wallet';
import { ReactNode } from 'react';
import { NETWORK, DEFAULT_NETWORK } from '../config/blockchain';

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const activeNetwork = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK];
  
  const walletProviders = [
    { id: PROVIDER_ID.KIBISIS },
    { id: PROVIDER_ID.LUTE },
    { id: PROVIDER_ID.DEFLY },
    { id: PROVIDER_ID.WALLETCONNECT }
  ];

  return (
    <UseWalletProvider
      providers={walletProviders}
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
