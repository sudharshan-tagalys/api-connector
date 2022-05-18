declare class API {
    call(method: string, path: string, requestOptions: any, headers?: {
        contentType: string;
    }): void;
    url(path: any): string;
}
declare const _default: API;
export default _default;
