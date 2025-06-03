import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '../contexts/WalletContext';
import { TESTNET_COUNTER_PACKAGE_ID } from '../constants';

export const useSubscribe = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const subscribe = async (tier: number) => {
    try {
      const txb = new TransactionBlock();
      
      // Call the subscribe function from the smart contract
      txb.moveCall({
        target: `${TESTNET_COUNTER_PACKAGE_ID}::suistream::subscribe`,
        arguments: [txb.pure(tier)],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });

      return result;
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error;
    }
  };

  return { subscribe };
};

export const useViewContent = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const viewContent = async (contentId: string, subscriptionId: string) => {
    try {
      const txb = new TransactionBlock();
      
      // Call the view_content function from the smart contract
      txb.moveCall({
        target: `${TESTNET_COUNTER_PACKAGE_ID}::suistream::view_content`,
        arguments: [txb.pure(contentId), txb.pure(subscriptionId)],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });

      return result;
    } catch (error) {
      console.error('Error viewing content:', error);
      throw error;
    }
  };

  return { viewContent };
};