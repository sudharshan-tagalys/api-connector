declare class LocalStorage {
    getItem(key: string): any;
    removeItem(key: string): void;
    setValue(key: string, value: string, ttl?: number): void;
    getCurrentTime(): number;
}
declare const _default: LocalStorage;
export default _default;
