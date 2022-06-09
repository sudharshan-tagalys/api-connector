import APIConnector from "../lib/apiConnector";
declare class PopularSearches extends APIConnector {
    getRequestOptions(): {
        path: string;
    };
    fetchPopularSearches(configuration: any): Promise<unknown>;
    static exporterName(): string;
}
export default PopularSearches;
