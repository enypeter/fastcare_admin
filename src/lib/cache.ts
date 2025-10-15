// Simple cache utility with TTL using in-memory map + localStorage persistence
// Key format: provided key string
// Stored localStorage value: { expires: number; data: any }

interface CacheEntry<T> { expires: number; data: T }

const memoryCache: Map<string, CacheEntry<unknown>> = new Map();

function now() { return Date.now(); }

export async function fetchWithCache<T>(key: string, ttlMs: number, fetcher: () => Promise<T>, forceRefresh = false): Promise<T> {
  if (!forceRefresh) {
    const mem = memoryCache.get(key);
    if (mem && mem.expires > now()) {
      return mem.data as T;
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: CacheEntry<T> = JSON.parse(raw);
        if (parsed.expires > now()) {
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  const data = await fetcher();
  const entry: CacheEntry<T> = { data, expires: now() + ttlMs };
  memoryCache.set(key, entry as CacheEntry<unknown>);
  try { localStorage.setItem(key, JSON.stringify(entry)); } catch { /* ignore quota */ }
  return data;
}

export function clearCacheKey(key: string) {
  memoryCache.delete(key);
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

export function clearAllCache() {
  memoryCache.clear();
}
