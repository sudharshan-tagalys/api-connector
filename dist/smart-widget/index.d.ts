import APIConnector from "../lib/apiConnector";
import { AnalyticsData } from "../shared/types";
import { WidgetRequestOptions } from "../shared/types";
declare class SmartWidget extends APIConnector {
    getRequestOptions(): WidgetRequestOptions;
    exporterName(): string;
    formatResponse(response: any): any;
    extractAnalyticsData(response: any): AnalyticsData;
}
declare const _default: SmartWidget;
export default _default;
