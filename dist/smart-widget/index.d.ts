import Widget from "../lib/widget";
declare class SmartWidget extends Widget {
    static exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
    extractAnalyticsData(response: any): {
        event_type: string;
        event_details: {
            pl_type: string;
            pl_details: any;
            pl_products: any;
            pl_total: any;
        };
    };
}
export default SmartWidget;
