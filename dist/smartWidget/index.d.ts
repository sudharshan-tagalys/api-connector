import APIConnector from "../lib/apiConnector";
import { AnalyticsData } from "../shared/types";
import { SmartWidgetRequestOptions } from "./types";
declare class SmartWidget extends APIConnector {
    getRequestOptions(): SmartWidgetRequestOptions;
    extractAnalyticsData(response: any): AnalyticsData;
}
declare const _default: SmartWidget;
export default _default;
