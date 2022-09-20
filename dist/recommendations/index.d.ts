import APIConnector from "../lib/apiConnector";
declare class Recommendations extends APIConnector {
    static exporterName(): string;
    formatResponse(response: any): any;
    getRequestOptions(): {
        path: string;
        params: {
            product_id: any;
            limit: any;
        };
    };
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
export default Recommendations;
