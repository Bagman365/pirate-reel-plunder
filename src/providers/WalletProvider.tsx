
import { ReactNode } from 'react';

type WalletProviderProps = {
  children: ReactNode;
};

// Simplified wallet provider that doesn't actually connect to any blockchain
export const WalletProvider = ({ children }: WalletProviderProps) => {
  return <>{children}</>;
};

export default WalletProvider;
