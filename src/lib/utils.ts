import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRelativeTime = (dateString: string) => {
  if (!dateString) return "";
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `Posted ${weeks} week${weeks === 1 ? '' : 's'} ago`;
  if (days > 0) return `Posted ${days} day${days === 1 ? '' : 's'} ago`;
  if (hours > 0) return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (minutes > 0) return `Posted ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  return `Posted ${seconds} second${seconds === 1 ? '' : 's'} ago`;
};

export const formatTotalSpend = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${Math.floor(amount / 1000000)}M+ spent`;
  } else if (amount >= 1000) {
    return `$${Math.floor(amount / 1000)}K+ spent`;
  } else {
    return `$${Math.floor(amount)}+ spent`;
  }
};