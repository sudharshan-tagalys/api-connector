import { APIIdentification } from "../types";
declare class API {
    private identification;
    private apiServer;
    call(method: string, path: string, requestOptions: any, headers?: {
        contentType: string;
    }): void;
    url(path: any): string;
    getIdentification(): APIIdentification;
    setConfiguration(configuration: any): void;
}
declare const _default: API;
export default _default;
