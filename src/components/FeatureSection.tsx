import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Decentralized Streaming',
    description: 'Stream content without intermediaries, with payments directly to creators.',
    icon: <CheckCircle className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Instant Transactions',
    description: 'Powered by Sui blockchain for fast and low-cost transactions.',
    icon: <CheckCircle className="w-6 h-6 text-purple-500" />
  },
  {
    title: 'Earn While You Stream',
    description: 'Monetize your content with built-in payment channels.',
    icon: <CheckCircle className="w-6 h-6 text-green-500" />
  },
  {
    title: 'Community Driven',
    description: 'Join a growing community of content creators and viewers.',
    icon: <CheckCircle className="w-6 h-6 text-yellow-500" />
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SuiStream?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of content streaming with blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Get Started with SuiStream
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
