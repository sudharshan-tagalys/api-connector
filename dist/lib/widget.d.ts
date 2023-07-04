import APIConnector from "../lib/apiConnector";
import { WidgetParams } from "../shared/types";
import { WidgetRequestOptions } from "../shared/types";
declare class Widget extends APIConnector {
    getRequestOptions(): WidgetRequestOptions;
    getParams(): WidgetParams;
    path(): string;
    plType(): string;
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
    new(requestOptions: any): {};
}
export default Widget;
