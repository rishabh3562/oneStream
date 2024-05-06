import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSelectedLayoutSegment } from "next/navigation"
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function useLayoutSegment() {
  const segment=useSelectedLayoutSegment();
  return segment;
}