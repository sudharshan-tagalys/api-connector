import APIConnector from "./lib/apiConnector";
import { SimilarProductsWidgetRequestOptions, AnalyticsData } from "./types";
declare class SimilarProductsWidget extends APIConnector {
    getRequestOptions(): SimilarProductsWidgetRequestOptions;
    extractAnalyticsData(response: any): AnalyticsData;
}
declare const _default: SimilarProductsWidget;
export default _default;
