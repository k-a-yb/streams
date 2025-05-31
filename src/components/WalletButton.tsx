import { Button } from "@/components/ui/button";
import { useWallet } from '@suiet/wallet-kit';
import { useWalletContext } from '@/providers/WalletProvider';
import { Wallet } from 'lucide-react';
import { formatAddress } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WalletButton() {
  const { address, disconnect, balance } = useWalletContext();
  const { connected, wallets, select } = useWallet();

  const handleConnect = async () => {
    try {
      if (wallets.length === 0) {
        window.open('https://chrome.google.com/webstore/detail/suiet/khpkpbbcccdmmclmpigdgddabeilkdpd', '_blank');
        return;
      }
      await select(wallets[0].name);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  if (!connected || !address) {
    return (
      <Button onClick={handleConnect} className="gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          {formatAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground">Wallet</span>
          <span className="font-mono">{formatAddress(address)}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground">Balance</span>
          <span>{balance} SUI</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={disconnect}
          className="text-destructive focus:text-destructive"
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
