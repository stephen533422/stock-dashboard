export type DataMode = "live" | "mock";

const STORAGE_KEY = "dataSource";
const listeners = new Set<() => void>();
let mode: DataMode = load();

function load(): DataMode {
  return localStorage.getItem(STORAGE_KEY) === "mock" ? "mock" : "live";
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getMode(): DataMode {
  return mode;
}

export function toggleMode(): void {
  mode = mode === "live" ? "mock" : "live";
  localStorage.setItem(STORAGE_KEY, mode);
  for (const listener of listeners) listener();
}
