import { Play, Tv, Star, Crown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card border-t bg-[#252434] border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Play className="w-8 h-8 text-neon-pink" />
              <h3 className="text-2xl font-orbitron font-bold text-white">
               SUI<span className="text-neon-pink">STREAM</span>
              </h3>
            </div>
            <p className="text-white/70">
              The future of entertainment on the blockchain. Powered by Sui Network for secure, decentralized streaming.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Content</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Movies</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">TV Shows</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Live TV</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Documentaries</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Sui Wallet Guide</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Technical Support</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">About Sui</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-neon-pink transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 SuiStream. Powered by Sui Network. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-neon-cyan">
              <Tv className="w-4 h-4" />
              <span className="text-sm">4K Streaming</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-purple">
              <Star className="w-4 h-4" />
              <span className="text-sm">Premium Content</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-pink">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Blockchain Secured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
