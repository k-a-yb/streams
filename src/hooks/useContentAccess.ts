import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { useSubscription } from '@/services/subscriptionService';

export const useContentAccess = (contentId: string, requiredTier: number = 1) => {
  const { address } = useWallet();
  const { data: subscription, isLoading } = useSubscription().useSubscriptionStatus();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!address) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }

      try {
        // If we're still loading the subscription, wait for it
        if (isLoading) return;

        // If no subscription or subscription expired, no access
        if (!subscription?.isActive || !subscription.tier) {
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Check if user's tier is sufficient
        const userTier = subscription.tier;
        const accessGranted = userTier >= requiredTier;
        
        setHasAccess(accessGranted);
      } catch (error) {
        console.error('Error checking content access:', error);
        setHasAccess(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAccess();
  }, [address, subscription, isLoading, requiredTier]);

  return {
    hasAccess,
    isLoading: isChecking || isLoading,
    subscriptionTier: subscription?.tier,
    isSubscribed: subscription?.isActive || false,
  };
};

// Higher-order component for protecting routes
export const withContentAccess = (
  Component: React.ComponentType<any>,
  requiredTier: number = 1,
  LoadingComponent: React.ComponentType = () => <div>Loading...</div>,
  AccessDeniedComponent: React.ComponentType = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
      <p className="text-muted-foreground mb-6">
        You need a subscription to access this content.
      </p>
      <a 
        href="#subscription-plans" 
        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        View Plans
      </a>
    </div>
  )
) => {
  return (props: any) => {
    const { hasAccess, isLoading } = useContentAccess('route-guard', requiredTier);

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (!hasAccess) {
      return <AccessDeniedComponent />;
    }

    return <Component {...props} />;
  };
};

// Component to wrap around protected content
export const ProtectedContent: React.FC<{
  children: React.ReactNode;
  requiredTier?: number;
  loadingComponent?: React.ReactNode;
  accessDeniedComponent?: React.ReactNode;
}> = ({
  children,
  requiredTier = 1,
  loadingComponent = <div>Loading...</div>,
  accessDeniedComponent = (
    <div className="p-6 text-center">
      <p>You don't have access to this content. Please upgrade your subscription.</p>
    </div>
  ),
}) => {
  const { hasAccess, isLoading } = useContentAccess('protected-content', requiredTier);

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (!hasAccess) {
    return <>{accessDeniedComponent}</>;
  }

  return <>{children}</>;
};
