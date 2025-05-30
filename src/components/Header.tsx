import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play } from 'lucide-react';
import WalletConnect from './WalletConnect';
import { useToast } from '../hooks/use-toast';

const Header = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Play className="w-8 h-8 text-neon-pink" />
          <h1 className="text-2xl font-orbitron font-bold text-white neon-text">
            SUI<span className="text-neon-pink">STREAM</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/movies" 
            className={`${isActive('/movies') ? 'text-neon-pink' : 'text-white/80'} hover:text-neon-pink transition-colors`}
          >
            Movies
          </Link>
          <Link 
            to="/tvshows" 
            className={`${isActive('/tvshows') ? 'text-neon-pink' : 'text-white/80'} hover:text-neon-pink transition-colors`}
          >
            TV Shows
          </Link>
          <Link 
            to="/collection" 
            className={`${isActive('/collection') ? 'text-neon-pink' : 'text-white/80'} hover:text-neon-pink transition-colors`}
          >
            My Collection
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <WalletConnect 
            isOpen={showWalletModal}
            onClose={() => setShowWalletModal(false)}
            onSuccess={(address) => {
              toast({
                title: "Wallet Connected",
                description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
              });
              setShowWalletModal(false);
            }}
          />
          <Button 
            onClick={() => setShowWalletModal(true)}
            className="bg-neon-pink hover:bg-neon-pink/90 text-white"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
