import { APIIdentification } from "../types";
declare class API {
    private configuration;
    call(method: string, path: string, requestOptions: any, headers?: {
        contentType: string;
    }): void;
    url(path: any): string;
    getIdentification(): APIIdentification;
    getCurrency(): Object;
    setConfiguration(configuration: any): void;
}
declare const _default: API;
export default _default;
