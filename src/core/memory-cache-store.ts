class InMemoryCacheStore implements CacheStore {
  private store: Map<string, { value: any, expiry: number }> = new Map();

  async get(key: string): Promise<any | null> {
    const cacheEntry = this.store.get(key);
    if (cacheEntry && cacheEntry.expiry > Date.now()) {
      return cacheEntry.value;
    }
    this.store.delete(key); // Remove expired cache
    return null;
  }

  async set(key: string, value: any, duration: number): Promise<void> {
    const expiry = Date.now() + duration * 1000; // Convertir a milisegundos
    this.store.set(key, { value, expiry });
  }
}