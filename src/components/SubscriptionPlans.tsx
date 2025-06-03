import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { useSubscribe } from '../lib/suistream';
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_PRICES } from '../constants';
import { useToast } from '../hooks/use-toast';
import { useWallet } from '../contexts/WalletContext';

const SubscriptionPlans = () => {
  const { subscribe } = useSubscribe();
  const { toast } = useToast();
  const { connected } = useWallet();

  const plans = [
    {
      name: 'Basic',
      price: `${SUBSCRIPTION_PRICES[SUBSCRIPTION_TIERS.BASIC] / 1_000_000_000} SUI`,
      tier: SUBSCRIPTION_TIERS.BASIC,
      period: '/month',
      icon: Zap,
      color: 'text-neon-cyan',
      borderColor: 'border-neon-cyan',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
      features: [
        'HD Quality Streaming',
        '1000+ Movies & Shows',
        '2 Devices',
        'Mobile & Web Access',
        'Standard Support'
      ]
    },
    {
      name: 'Premium',
      price: `${SUBSCRIPTION_PRICES[SUBSCRIPTION_TIERS.PREMIUM] / 1_000_000_000} SUI`,
      tier: SUBSCRIPTION_TIERS.PREMIUM,
      period: '/month',
      icon: Star,
      color: 'text-neon-pink',
      borderColor: 'border-neon-pink',
      bgGradient: 'from-pink-500/10 to-purple-500/10',
      popular: true,
      features: [
        '4K Ultra HD Streaming',
        '5000+ Movies & Shows',
        '5 Devices',
        'All Platform Access',
        'Offline Downloads',
        'Priority Support',
        'Early Access Content'
      ]
    },
    {
      name: 'Ultimate',
      price: `${SUBSCRIPTION_PRICES[SUBSCRIPTION_TIERS.ULTIMATE] / 1_000_000_000} SUI`,
      tier: SUBSCRIPTION_TIERS.ULTIMATE,
      period: '/month',
      icon: Crown,
      color: 'text-neon-purple',
      borderColor: 'border-neon-purple',
      bgGradient: 'from-purple-500/10 to-indigo-500/10',
      features: [
        '8K Streaming',
        'Unlimited Content',
        'Unlimited Devices',
        'VIP Live Events',
        'Premium Downloads',
        'Concierge Support',
        'Exclusive Content',
        'NFT Rewards'
      ]
    }
  ];

  const handleSubscribe = async (tier: number) => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to subscribe",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await subscribe(tier);
      toast({
        title: "Subscription Successful",
        description: "Your subscription has been activated",
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
            Choose Your <span className="text-neon-pink">Plan</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Secure payments on Sui Network. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`glass-card ${plan.borderColor} ${plan.popular ? 'scale-105 neon-border animate-neon-pulse' : ''} relative overflow-hidden group hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-neon-pink to-neon-purple p-2 text-center">
                    <span className="text-white font-semibold text-sm">MOST POPULAR</span>
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.bgGradient} flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-orbitron text-white">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className={`text-4xl font-bold ${plan.color}`}>
                      {plan.price}
                    </div>
                    <div className="text-white/60">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className={`w-5 h-5 ${plan.color} flex-shrink-0`} />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => handleSubscribe(plan.tier)}
                    className={`w-full bg-gradient-to-r ${plan.bgGradient} hover:opacity-80 text-white font-semibold py-3 ${plan.borderColor} border transition-all duration-300 group-hover:animate-neon-pulse`}
                  >
                    Subscribe with SUI
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;