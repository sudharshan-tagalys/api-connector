import APIConnector from "../lib/apiConnector";
import { AnalyticsData } from "../shared/types";
import { WidgetParams } from "../shared/types";
import { WidgetRequestOptions } from "../shared/types";
declare class Widget extends APIConnector {
    getRequestOptions(): WidgetRequestOptions;
    getParams(): WidgetParams;
    path(): string;
    plType(): string;
    extractAnalyticsData(response: any): AnalyticsData;
}
export default Widget;
