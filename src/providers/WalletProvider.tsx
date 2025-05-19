
import { WalletProvider as UseWalletProvider } from '@txnlab/use-wallet-react';
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
  
  // Define providers with correct structure for v3.7.2
  const wallets = [
    {
      id: 'pera-wallet',
      name: 'Pera Wallet',
      icon: 'https://pbs.twimg.com/profile_images/1469735318488293376/AuOdfwvH_400x400.jpg',
      connector: PeraWalletConnect,
    },
    {
      id: 'defly-wallet',
      name: 'Defly Wallet',
      icon: 'https://asa-list.tinyman.org/assets/470842789/icon',
      connector: DeflyWalletConnect,
    },
    {
      id: 'daffi-wallet',
      name: 'Daffi Wallet',
      icon: 'https://play-lh.googleusercontent.com/Mvn9I7Qeya-T6A7CiJSwhsKuYcIZBwJ2RLR0yD0JGGELo0BFTWFdQweAOcMrAVXFGdM=w240-h480-rw',
      connector: DaffiWalletConnect,
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'https://res.cloudinary.com/wallet-connect/image/upload/v1717605647/Website%20Sockets/Desktop/SocketsD%20Icon%20White%20Dark.svg',
      connector: WalletConnect,
      options: {
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      }
    }
  ];
  
  return (
    <UseWalletProvider
      wallets={wallets}
      nodeConfig={{
        network: activeNetwork.name,
        nodeServer: activeNetwork.algodServer,
        nodePort: activeNetwork.algodPort,
        nodeToken: activeNetwork.algodToken,
        indexerServer: activeNetwork.indexerServer || '',
        indexerPort: activeNetwork.indexerPort,
        indexerToken: activeNetwork.algodToken,
      }}
    >
      {children}
    </UseWalletProvider>
  );
};

export default WalletProvider;
