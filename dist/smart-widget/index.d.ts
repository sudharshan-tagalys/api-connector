import Widget from "../lib/widget";
import { AnalyticsData } from "../shared/types";
declare class SmartWidget extends Widget {
    exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
    extractAnalyticsData(response: any): AnalyticsData;
}
declare const _default: SmartWidget;
export default _default;
