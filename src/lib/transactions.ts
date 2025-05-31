import { TransactionBlock as SuiTransactionBlock } from '@mysten/sui.js/transactions';
import { toast } from 'sonner';
import { getPackageId, getPlatformWallet } from '@/config/networks';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { WalletAccount } from '@mysten/wallet-standard';

interface TransactionOptions {
  showLoading?: boolean;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

type SignAndExecuteTransactionBlock = (input: {
  transactionBlock: Uint8Array | string | SuiTransactionBlock;
  account?: WalletAccount;
  options?: {
    showEffects?: boolean;
    showEvents?: boolean;
    showObjectChanges?: boolean;
    showInput?: boolean;
  };
  requestType?: 'WaitForEffectsCert' | 'WaitForLocalExecution';
}) => Promise<SuiTransactionBlockResponse>;

export const executeTransaction = async (
  txb: SuiTransactionBlock,
  signAndExecuteTransactionBlock: SignAndExecuteTransactionBlock,
  options: TransactionOptions = {}
): Promise<SuiTransactionBlockResponse | null> => {
  const {
    showLoading = true,
    loadingMessage = 'Processing transaction...',
    successMessage = 'Transaction successful!',
    errorMessage = 'Transaction failed',
  } = options;

  let toastId: string | number | undefined;
  if (showLoading) {
    toastId = toast.loading(loadingMessage);
  }

  try {
    // Set the gas budget
    txb.setGasBudget(100000000); // 0.1 SUI
    
    // Execute the transaction
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    // Check if the transaction was successful
    const status = result.effects?.status?.status;
    
    if (status === 'success') {
      if (showLoading && successMessage) {
        toast.success(successMessage, { id: toastId });
      }
      return result;
    } else {
      throw new Error('Transaction execution failed');
    }
  } catch (error) {
    console.error('Transaction error:', error);
    const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred';
    toast.error(`${errorMessage}: ${errorMsg}`, { id: toastId });
    return null;
  }
};

// Helper function to create a subscription transaction
export const createSubscriptionTx = (
  txb: SuiTransactionBlock,
  tier: number,
  months: number = 1
): SuiTransactionBlock => {
  const packageId = getPackageId();
  const platformWallet = getPlatformWallet();
  
  // Call the subscribe function in the smart contract
  txb.moveCall({
    target: `${packageId}::suistream::subscribe`,
    arguments: [
      txb.object(platformWallet), // platform: &mut SuiStream
      txb.pure.u64(months), // months: u64
      txb.pure.u8(tier), // tier: u8
    ],
  });
  
  return txb;
};

// Helper function to cancel a subscription
export const createCancelSubscriptionTx = (
  txb: SuiTransactionBlock,
  subscriptionId: string
): SuiTransactionBlock => {
  const packageId = getPackageId();
  
  // Call the cancel_subscription function in the smart contract
  txb.moveCall({
    target: `${packageId}::suistream::cancel_subscription`,
    arguments: [
      txb.object(subscriptionId), // subscription: &mut Subscription
    ],
  });
  
  return txb;
};

// Helper function to renew a subscription
export const createRenewSubscriptionTx = (
  txb: SuiTransactionBlock,
  subscriptionId: string,
  months: number = 1
): SuiTransactionBlock => {
  const packageId = getPackageId();
  
  // Call the renew_subscription function in the smart contract
  txb.moveCall({
    target: `${packageId}::suistream::renew_subscription`,
    arguments: [
      txb.object(subscriptionId), // subscription: &mut Subscription
      txb.pure.u64(months), // months: u64
    ],
  });
  
  return txb;
};
