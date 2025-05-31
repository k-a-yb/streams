import { Link, useLocation } from 'react-router-dom';
import { Play } from 'lucide-react';
import { WalletButton } from './WalletButton';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

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
          <WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
