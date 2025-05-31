import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock as SuiTransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { getPackageId, getPlatformWallet, getFullNodeUrl } from '@/config/networks';

// Using SuiTransactionBlock directly for type and value

// Define the subscription data interface
interface SubscriptionData {
  isActive: boolean;
  tier?: number;
  expiresAt: number;
  startDate: number;
}

// Initialize Sui client
const client = new SuiClient({ url: getFullNodeUrl() });

// Subscription tiers with their respective prices in MIST (1 SUI = 1_000_000_000 MIST)
export const SUBSCRIPTION_TIERS = {
  1: {
    id: 1,
    name: 'Basic',
    price: 5_000_000_000, // 5 SUI
    features: [
      'Access to basic content',
      'SD quality streaming',
      'Watch on 1 device',
    ],
  },
  2: {
    id: 2,
    name: 'Premium',
    price: 10_000_000_000, // 10 SUI
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
    price: 15_000_000_000, // 15 SUI
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

// Subscription response type from the blockchain
// This interface is kept for reference but not used directly
// to avoid unused variable warnings
// interface SubscriptionResponse {
//   data: {
//     id: string;
//     tier: number;
//     user_address: string;
//     start_date: string;
//     expiry_date: string;
//     is_active: boolean;
//     auto_renew: boolean;
//   } | null;
// }

export const useSubscription = () => {
  const { address, signAndExecuteTransactionBlock } = useWallet();
  const queryClient = useQueryClient();
  const packageId = getPackageId();
  const platformWallet = getPlatformWallet();

  // Get the current user's subscription
  const getSubscription = async (userAddress: string): Promise<SubscriptionData | null> => {
    if (!userAddress) return null;
    
    try {
      const txb = new SuiTransactionBlock();
      
      // Use devInspectTransactionBlock to simulate the transaction
      await client.devInspectTransactionBlock({
        transactionBlock: await txb.build({
          client,
          onlyTransactionKind: true
        }),
        sender: userAddress,
      });

      // For now, return mock data since we're just simulating the transaction
      // In a real implementation, you would parse the result from the blockchain
      return {
        isActive: true,
        tier: 1,
        startDate: Math.floor(Date.now() / 1000),
        expiresAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
      };
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  };

  // React Query hook to fetch subscription status
  const useSubscriptionStatus = () => {
    return useQuery({
      queryKey: ['subscription', address],
      queryFn: () => address ? getSubscription(address) : null,
      enabled: !!address,
      refetchInterval: 60_000, // Refetch every minute
    });
  };

  // Check if user can access content based on their subscription tier
  const checkContentAccess = async (requiredTier: SubscriptionTier = 1) => {
    if (!address) return false;
    
    try {
      const subscription = await getSubscription(address);
      if (!subscription?.isActive) return false;
      
      // Check if user's tier meets or exceeds required tier
      return (subscription.tier || 0) >= requiredTier;
    } catch (error) {
      console.error('Error checking content access:', error);
      return false;
    }
  };

  // Subscribe to a plan
  const subscribe = async (tier: SubscriptionTier) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      const txb = new SuiTransactionBlock();
      const tierInfo = SUBSCRIPTION_TIERS[tier];
      
      if (!tierInfo) {
        throw new Error('Invalid subscription tier');
      }

      // Transfer SUI to platform wallet
      const [coin] = txb.splitCoins(txb.gas, [txb.pure(tierInfo.price)]);
      txb.transferObjects([coin], txb.pure(platformWallet));

      // Call the subscribe function in the smart contract
      txb.moveCall({
        target: `${packageId}::suistream::subscribe`,
        arguments: [
          txb.pure(tier),
        ],
      });

      // Execute the transaction using the wallet's signAndExecuteTransactionBlock
      const result = await signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showEffects: true,
          showEvents: true,
        },
      } as any); // Type assertion to handle the type mismatch

      // Invalidate subscription query to refetch the latest data
      await queryClient.invalidateQueries({ queryKey: ['subscription', address] });
      
      return result;
    } catch (error: any) {
      console.error('Subscription failed:', error);
      throw new Error(error.message || 'Failed to process subscription');
    }
  };

  return {
    subscribe,
    useSubscriptionStatus,
    checkContentAccess,
    getSubscription,
    tiers: SUBSCRIPTION_TIERS
  };
};

/**
 * Hook to check if user has access to content based on their subscription tier
 */
export const useContentAccess = (requiredTier: SubscriptionTier = 1) => {
  const { data: subscription, isLoading } = useSubscription().useSubscriptionStatus();
  
  return {
    hasAccess: subscription?.isActive && (subscription.tier || 0) >= requiredTier,
    isLoading,
    subscriptionTier: subscription?.tier,
    isSubscribed: subscription?.isActive || false,
  };
};
