import APIConnector from "../lib/apiConnector";
declare class PersonalizedRecommendations extends APIConnector {
    static exporterName(): string;
    formatResponse(response: any): any;
    getRequestOptions(): {
        path: string;
        params: {
            per_page: any;
            zero_state: string;
            request: string[];
            user: {
                device_id: string;
            };
        };
    };
    getLimit(): any;
    getHelpersToExpose(response: any, formattedResponse: any): {};
    extractAnalyticsData(response: any): {
        event_type?: undefined;
        event_details?: undefined;
    } | {
        event_type: string;
        event_details: {
            pl_type: string;
            pl_details: any;
            pl_products: any;
            pl_total: any;
        };
    };
}
export default PersonalizedRecommendations;
