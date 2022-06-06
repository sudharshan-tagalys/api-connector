import APIConnector from "../lib/apiConnector";
declare class PopularSearches extends APIConnector {
    getRequestOptions(): {
        path: string;
    };
    fetchPopularSearches(configuration: any): Promise<unknown>;
    exporterName(): string;
}
declare const _default: PopularSearches;
export default _default;
