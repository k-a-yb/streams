import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { createSubscriptionTx, createCancelSubscriptionTx, createRenewSubscriptionTx } from '@/lib/transactions';

// Helper function to get package ID
const getSuistreamPackageId = (): string => {
  return import.meta.env.VITE_NEXT_PUBLIC_SUISTREAM_PACKAGE_ID || '';
};

// Helper function to get platform wallet address
const getPlatformWallet = (): string => {
  return '0xdedef1d507c9be500c5702be259a1dea45ccbbd7ca58c86ab8e31d169cf07a2e';
};

// Subscription tiers with their respective prices in MIST (1 SUI = 1_000_000_000 MIST)
export const SUBSCRIPTION_TIERS = {
  1: {
    id: 1,
    name: 'Basic',
    price: 1_000_000_000, // 1 SUI
    features: [
      'Access to basic content',
      'SD quality streaming',
      'Watch on 1 device',
    ],
  },
  2: {
    id: 2,
    name: 'Premium',
    price: 5_000_000_000, // 5 SUI
    features: [
      'Access to all basic content',
      'HD quality streaming',
      'Watch on 2 devices',
      'Download content',
    ],
  },
  3: {
    id: 3,
    name: 'Ultimate',
    price: 10_000_000_000, // 10 SUI
    features: [
      'Access to all content',
      '4K + HDR quality',
      'Watch on 4 devices',
      'Download content',
      'Early access to new releases',
    ],
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export interface Subscription {
  id: string;
  tier: SubscriptionTier;
  userAddress: string;
  startDate: number; // Unix timestamp in seconds
  expiresAt: number; // Unix timestamp in seconds
  isActive: boolean;
  autoRenew: boolean;
}

export const useSubscription = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();
  const queryClient = useQueryClient();

  // Get subscription status
  const { data: subscription, isLoading, refetch } = useQuery<Subscription | null>({
    queryKey: ['subscription', address],
    queryFn: async () => {
      if (!address) return null;
      
      try {
        // Get the package ID
        const packageId = getSuistreamPackageId();
        if (!packageId) {
          console.error('Package ID not configured');
          return null;
        }

        // In a real app, you would query the blockchain for the user's subscription
        // For now, we'll simulate a subscription
        return {
          id: 'simulated-subscription-id',
          tier: 1 as const,
          userAddress: address,
          startDate: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
          expiresAt: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
          isActive: true,
          autoRenew: true
        };
      } catch (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }
    },
    enabled: !!address,
    staleTime: 60000
  });

  // Subscribe to a plan
  const subscribe = async (tier: SubscriptionTier) => {
    if (!address) throw new Error('Wallet not connected');
    if (!signAndExecuteTransactionBlock) throw new Error('Wallet not connected');
    
    const txb = new TransactionBlock();
    const tierInfo = SUBSCRIPTION_TIERS[tier];
    
    if (!tierInfo) {
      throw new Error('Invalid subscription tier');
    }
    
    try {
      // Split the exact amount needed for the subscription
      const [coin] = txb.splitCoins(txb.gas, [txb.pure(tierInfo.price)]);
      
      // Create and execute the subscription transaction
      createSubscriptionTx(txb, tier, coin);
      
      // Execute the transaction
      const result = await signAndExecuteTransactionBlock({
        // @ts-ignore - Type compatibility issue
        transactionBlock: txb as any,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
      
      if (result.effects.status.status !== 'success') {
        throw new Error('Transaction failed');
      }
      
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['subscription', address] });
      
      // Refetch subscription data
      await refetch();
      
      return result;
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error;
    }
  };
  
  // Cancel an active subscription
  const cancelSubscription = async (subscriptionId: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!signAndExecuteTransactionBlock) throw new Error('Wallet not connected');
    
    const txb = new TransactionBlock();
    
    try {
      // Create and execute the cancel subscription transaction
      createCancelSubscriptionTx(txb, subscriptionId);
      
      // Execute the transaction
      const result = await signAndExecuteTransactionBlock({
        // @ts-ignore - Type compatibility issue
        transactionBlock: txb as any,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
      
      if (result.effects.status.status !== 'success') {
        throw new Error('Transaction failed');
      }
      
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['subscription', address] });
      
      // Refetch subscription data
      await refetch();
      
      return result;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  };
  
  // Renew an existing subscription
  const renewSubscription = async (subscriptionId: string, tier: SubscriptionTier) => {
    if (!address) throw new Error('Wallet not connected');
    if (!signAndExecuteTransactionBlock) throw new Error('Wallet not connected');
    
    const txb = new TransactionBlock();
    const tierInfo = SUBSCRIPTION_TIERS[tier];
    
    if (!tierInfo) {
      throw new Error('Invalid subscription tier');
    }
    
    try {
      // Split the exact amount needed for the subscription
      const [coin] = txb.splitCoins(txb.gas, [txb.pure(tierInfo.price)]);
      
      // Create and execute the renew subscription transaction
      createRenewSubscriptionTx(txb, subscriptionId, coin, 1); // 1 month renewal
      
      // Execute the transaction
      const result = await signAndExecuteTransactionBlock({
        // @ts-ignore - Type compatibility issue
        transactionBlock: txb as any,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
      
      if (result.effects.status.status !== 'success') {
        throw new Error('Transaction failed');
      }
      
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['subscription', address] });
      
      // Refetch subscription data
      await refetch();
      
      return result;
    } catch (error) {
      console.error('Error renewing subscription:', error);
      throw error;
    }
  };

  // Get subscription status (simplified)
  const useSubscriptionStatus = () => {
    return useQuery({
      queryKey: ['subscriptionStatus', address],
      queryFn: async () => {
        if (!subscription) return null;
        
        // In a real app, you would query the blockchain for the latest status
        return {
          isActive: subscription.isActive,
          expiresAt: subscription.expiresAt,
          daysRemaining: Math.ceil((subscription.expiresAt * 1000 - Date.now()) / (1000 * 60 * 60 * 24)),
        };
      },
      enabled: !!subscription && !!address,
      refetchInterval: 60000, // Check every minute
    });
  };

  return {
    subscribe,
    cancelSubscription,
    renewSubscription,
    useSubscriptionStatus,
    subscription: subscription || null,
    isLoading,
    refetch,
    tiers: SUBSCRIPTION_TIERS
  };
};

// Hook to check if user has access to content based on their subscription tier
export const useContentAccess = (requiredTier: SubscriptionTier = 1) => {
  const { subscription } = useSubscription();
  
  if (!subscription) {
    return { hasAccess: false, isLoading: true };
  }
  
  // User has access if their subscription tier is equal to or higher than required
  const hasAccess = subscription.tier >= requiredTier;
  
  return { hasAccess, isLoading: false };
};
