import { Button } from '../components/ui/button';
import { Play, Star, Tv } from 'lucide-react';

const Hero = () => {
  return (
    <section className="cinema-hero min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-pink-900/30 to-blue-900/50 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white leading-tight">
              UNLIMITED
              <span className="block text-transparent bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text animate-glow text-white">
                ENTERTAINMENT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Stream thousands of movies and TV shows on the blockchain. 
              <span className="text-neon-cyan"> Powered by Sui Network</span> for secure, 
              decentralized entertainment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white font-semibold px-8 py-4 text-lg neon-border border-neon-pink animate-neon-pulse transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Streaming
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Tv className="w-6 h-6 mr-3" />
              Browse Catalog
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-neon-pink mb-2">10K+</div>
              <div className="text-white/80">Movies & Shows</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">4K</div>
              <div className="text-white/80">Ultra HD Quality</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">24/7</div>
              <div className="text-white/80">Live Streaming</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <Star className="w-8 h-8 text-neon-pink opacity-50" />
      </div>
      <div className="absolute bottom-32 right-10 animate-bounce delay-2000">
        <Play className="w-12 h-12 text-neon-purple opacity-30" />
      </div>
    </section>
  );
};

export default Hero;
