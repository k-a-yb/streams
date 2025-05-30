import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, X } from 'lucide-react';

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (address: string) => void;
}

export default function WalletConnect({ isOpen, onClose, onSuccess }: WalletConnectProps) {
  const { connected, account, select, disconnect } = useWallet();
  const [isMounted, setIsMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (connected && account?.address) {
      onSuccess(account.address);
    }
  }, [connected, account, onSuccess]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await select('Suiet');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isMounted || !isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#131a2b] rounded-lg p-6 w-full max-w-md relative mt-[20vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-center">Connect Wallet</h2>
        
        <div className="space-y-4">
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              'Connecting...'
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                <span>Connect with Suiet Wallet</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
