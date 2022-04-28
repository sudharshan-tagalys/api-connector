declare class API {
    private identification;
    call(method: any, url: any, requestOptions: any, analyticsDataFormatter: any): void;
    isInValidIdentification(identification: any): boolean;
    setApiIdentification(identification: any): void;
}
declare const _default: API;
export default _default;
