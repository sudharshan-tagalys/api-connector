import APIConnector from "../lib/apiConnector";
declare class PopularSearches extends APIConnector {
    getRequestOptions(): {
        path: string;
    };
    extractAnalyticsData(response: any): boolean;
    fetchPopularSearches(configuration: any): Promise<unknown>;
    beforeAPICall(params: any): any;
    static exporterName(): string;
}
export default PopularSearches;
