import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Sui address to a shorter version: 0x1234...5678
 */
export function formatAddress(address?: string | null, start = 6, end = 4): string {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Formats a number to a more readable format (e.g., 1.5K, 2.3M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Converts MIST to SUI (1 SUI = 1,000,000,000 MIST)
 */
export function mistToSui(mist: string | number): string {
  const amount = typeof mist === 'string' ? parseFloat(mist) : mist;
  return (amount / 1_000_000_000).toFixed(4);
}

/**
 * Converts SUI to MIST (1 SUI = 1,000,000,000 MIST)
 */
export function suiToMist(sui: string | number): string {
  const amount = typeof sui === 'string' ? parseFloat(sui) : sui;
  return (amount * 1_000_000_000).toFixed(0);
}

/**
 * Shortens a transaction hash for display
 */
export function shortenTxHash(hash: string, start = 8, end = 4): string {
  if (!hash) return '';
  if (hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}

/**
 * Formats a timestamp to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'just now';
}
