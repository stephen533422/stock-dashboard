import { useSyncExternalStore } from "react";
import { subscribe, getMode, toggleMode } from "../store/dataSourceStore";

export function useDataSource() {
  const mode = useSyncExternalStore(subscribe, getMode);
  return { mode, toggle: toggleMode };
}
