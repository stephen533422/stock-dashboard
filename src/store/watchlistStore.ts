const STORAGE_KEY = "watchlist";

const listeners = new Set<() => void>();
let watched = load();

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getWatched(): ReadonlySet<string> {
  return watched;
}

export function isWatched(symbol: string): boolean {
  return watched.has(symbol);
}

export function toggleWatched(symbol: string): void {
  const next = new Set(watched);
  if (next.has(symbol)) {
    next.delete(symbol);
  } else {
    next.add(symbol);
  }
  watched = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  emit();
}
