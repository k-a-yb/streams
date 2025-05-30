import { createContext, useContext, ReactNode } from 'react';
import { useWallet as useSuietWallet } from '@suiet/wallet-kit';

// Create a context to provide wallet functionality throughout the app
type WalletContextType = ReturnType<typeof useSuietWallet>;

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useSuietWallet();
  
  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// For backward compatibility
export const useWalletContext = useWallet;
