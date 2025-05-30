import { ContentItem } from '../lib/api';

interface HeroSectionProps {
  content?: ContentItem;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {content?.title || 'Stream & Monetize Content on Sui'}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {content?.overview || 'Discover, create, and earn with decentralized content streaming. Built on Sui blockchain for fast, secure, and scalable experiences.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Start Streaming
            </button>
            <button className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
