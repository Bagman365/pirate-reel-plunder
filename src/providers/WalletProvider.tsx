
import { WalletProvider as UseWalletProvider, PROVIDER_ID } from '@txnlab/use-wallet-react';
import { ReactNode } from 'react';
import { NETWORK, DEFAULT_NETWORK } from '../config/blockchain';
import { PeraWalletConnect } from '@perawallet/connect';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const activeNetwork = NETWORK[DEFAULT_NETWORK as keyof typeof NETWORK];
  
  const walletProviders = {
    [PROVIDER_ID.PERA]: {
      id: PROVIDER_ID.PERA,
      name: 'Pera Wallet',
      connect: async () => new PeraWalletConnect(),
    },
    [PROVIDER_ID.DEFLY]: {
      id: PROVIDER_ID.DEFLY,
      name: 'Defly Wallet',
      connect: async () => new DeflyWalletConnect(),
    },
    [PROVIDER_ID.DAFFI]: {
      id: PROVIDER_ID.DAFFI,
      name: 'Daffi Wallet',
      connect: async () => new DaffiWalletConnect(),
    },
    [PROVIDER_ID.WALLETCONNECT]: {
      id: PROVIDER_ID.WALLETCONNECT,
      name: 'WalletConnect',
      connect: async () => 
        new WalletConnect({ bridge: 'https://bridge.walletconnect.org', qrcodeModal: QRCodeModal }),
    },
  };
  
  return (
    <UseWalletProvider
      providers={walletProviders}
      nodeConfig={{
        network: activeNetwork.name,
        nodeServer: activeNetwork.algodServer,
        nodePort: activeNetwork.algodPort,
        nodeToken: activeNetwork.algodToken,
        indexerServer: activeNetwork.indexerServer || '',
        indexerPort: activeNetwork.algodPort, // Using algodPort as fallback
        indexerToken: activeNetwork.algodToken,
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
