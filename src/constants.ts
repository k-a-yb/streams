export const TESTNET_COUNTER_PACKAGE_ID = "0x123..."; // Replace with your deployed package ID
export const MAINNET_COUNTER_PACKAGE_ID = "0x456..."; // Replace with your deployed package ID
export const DEVNET_COUNTER_PACKAGE_ID = "0x789..."; // Replace with your deployed package ID

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const TMDB_BACKDROP_SIZE = "original";
export const TMDB_POSTER_SIZE = "w500";

export const SUBSCRIPTION_TIERS = {
  BASIC: 1,
  PREMIUM: 2,
  ULTIMATE: 3
} as const;

export const SUBSCRIPTION_PRICES = {
  [SUBSCRIPTION_TIERS.BASIC]: 5_000_000_000, // 5 SUI
  [SUBSCRIPTION_TIERS.PREMIUM]: 10_000_000_000, // 10 SUI
  [SUBSCRIPTION_TIERS.ULTIMATE]: 15_000_000_000 // 15 SUI
} as const;