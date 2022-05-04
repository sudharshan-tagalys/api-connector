declare class Cookie {
    isEnabled(): boolean;
    batchUpdate(cookies: any): void;
    update({ name, value, expiryTime }: {
        name: any;
        value?: string;
        expiryTime: any;
    }): void;
    get(cname: any): string;
    set(cname: any, cvalue: any, expiryTime: any): void;
    delete(name: any): void;
}
declare const _default: Cookie;
export default _default;
