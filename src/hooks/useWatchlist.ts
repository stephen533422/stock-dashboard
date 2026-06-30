import { useSyncExternalStore } from "react";
import {
  subscribe,
  getWatched,
  isWatched,
  toggleWatched,
} from "../store/watchlistStore";

export function useWatchlist(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, getWatched);
}

export function useIsWatched(symbol: string): boolean {
  return useSyncExternalStore(subscribe, () => isWatched(symbol));
}

export { toggleWatched };
