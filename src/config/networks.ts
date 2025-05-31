// Network configuration for different environments
export type Network = 'testnet' | 'mainnet' | 'devnet' | 'local';

// Contract addresses and configuration for each network
interface NetworkConfig {
  packageId: string;
  module: string;
  platformWallet: string;
  fullNodeUrl: string;
  faucetUrl?: string;
  explorerUrl: string;
}

type NetworkConfigs = {
  [key in Network]?: NetworkConfig;
};

// Update these with your actual contract addresses
const NETWORKS: NetworkConfigs = {
  testnet: {
    packageId: '0xYOUR_TESTNET_PACKAGE_ID',
    module: 'suistream',
    platformWallet: '0xYOUR_TESTNET_PLATFORM_WALLET',
    fullNodeUrl: 'https://fullnode.testnet.sui.io',
    faucetUrl: 'https://faucet.testnet.sui.io/gas',
    explorerUrl: 'https://suiexplorer.com',
  },
  mainnet: {
    packageId: '0xYOUR_MAINNET_PACKAGE_ID',
    module: 'suistream',
    platformWallet: '0xYOUR_MAINNET_PLATFORM_WALLET',
    fullNodeUrl: 'https://fullnode.mainnet.sui.io',
    explorerUrl: 'https://suiexplorer.com',
  },
  // Add other environments as needed
};

// Get the current network from environment variables or default to testnet
export const CURRENT_NETWORK: Network = (import.meta.env.VITE_NETWORK as Network) || 'testnet';

// Get the current network configuration
export const getNetworkConfig = (): NetworkConfig => {
  const config = NETWORKS[CURRENT_NETWORK];
  if (!config) {
    throw new Error(`No configuration found for network: ${CURRENT_NETWORK}`);
  }
  return config;
};

// Get the full node URL for the current network
export const getFullNodeUrl = (): string => {
  return getNetworkConfig().fullNodeUrl;
};

// Get the explorer URL for the current network
export const getExplorerUrl = (): string => {
  return getNetworkConfig().explorerUrl;
};

// Get the faucet URL for the current network (if available)
export const getFaucetUrl = (): string | undefined => {
  return getNetworkConfig().faucetUrl;
};

// Get the package ID for the current network
export const getPackageId = (): string => {
  return getNetworkConfig().packageId;
};

// Get the platform wallet address for the current network
export const getPlatformWallet = (): string => {
  return getNetworkConfig().platformWallet;
};
