import * as qs from "qs";
declare class QueryStringManager {
    private configuration;
    parse(params: any): qs.ParsedQs;
    stringify(params: any): string;
    setConfiguration(configuration?: any): void;
    getConfiguration(): any;
}
declare const _default: QueryStringManager;
export default _default;
