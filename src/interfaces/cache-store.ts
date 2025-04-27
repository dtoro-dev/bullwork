export interface CacheStore {
  get(key: string): Promise<any | null>;
  set(key: string, value: any, duration: number): Promise<void>;
}