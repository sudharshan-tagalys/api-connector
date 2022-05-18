import APIConnector from "../lib/apiConnector";
import { AnalyticsData } from "../shared/types";
import { SimilarProductsWidgetRequestOptions } from "./types";
declare class SimilarProductsWidget extends APIConnector {
    getRequestOptions(): SimilarProductsWidgetRequestOptions;
    extractAnalyticsData(response: any): AnalyticsData;
}
declare const _default: SimilarProductsWidget;
export default _default;
