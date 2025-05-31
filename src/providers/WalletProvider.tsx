import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { WalletProvider as SuietWalletProvider, useWallet } from '@suiet/wallet-kit';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// Create a context for wallet and blockchain state
type WalletContextType = {
  isConnected: boolean;
  address: string | null;
  balance: string;
  network: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  client: SuiClient;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { connected, address, signAndExecuteTransactionBlock, disconnect: disconnectWallet } = useWallet();
  const [balance, setBalance] = useState('0');
  const [network, setNetwork] = useState('testnet');

  // Initialize Sui client
  const client = useMemo(() => {
    return new SuiClient({ url: getFullnodeUrl(network as 'testnet' | 'mainnet') });
  }, [network]);

  // Update balance when address or network changes
  useEffect(() => {
    const updateBalance = async () => {
      if (!address) {
        setBalance('0');
        return;
      }

      try {
        const coinType = '0x2::sui::SUI';
        const { totalBalance } = await client.getBalance({
          owner: address,
          coinType,
        });
        setBalance((Number(totalBalance) / 1_000_000_000).toFixed(4));
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('0');
      }
    };

    updateBalance();
    const interval = setInterval(updateBalance, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [address, client, network]);

  const connect = async () => {
    try {
      // Wallet connection is handled by the SuietWalletProvider
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const disconnect = async () => {
    try {
      await disconnectWallet();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    <SuietWalletProvider>
      <WalletContext.Provider
        value={{
          isConnected: connected,
          address: address || null,
          balance,
          network,
          connect,
          disconnect,
          client,
        }}
      >
        {children}
      </WalletContext.Provider>
    </SuietWalletProvider>
  );
}

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
