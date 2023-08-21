declare class ShopifyAPI {
    call(method: string, path: string, requestOptions: any, headers?: {}): Promise<any>;
    url(path: any): string;
}
export default ShopifyAPI;
