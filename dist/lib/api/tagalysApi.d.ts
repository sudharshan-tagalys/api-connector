declare class TagalysAPI {
    call(method: string, path: string, requestOptions: any, headers?: {
        contentType: string;
    }): Promise<any>;
    url(path: any): string;
    isOnline(): boolean;
    static isOffline(): boolean;
    setAsOffline(): void;
    setAsOnline(): void;
    isAPIHealthy(): Promise<boolean>;
}
export default TagalysAPI;
