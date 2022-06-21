import Widget from "../lib/widget";
import { AnalyticsData } from "../shared/types";
declare class SmartWidget extends Widget {
    static exporterName(): string;
    path(): string;
    getParams(): {
        request: string[];
        per_page: any;
    };
    plType(): string;
    formatResponse(response: any): any;
    extractAnalyticsData(response: any): AnalyticsData;
}
export default SmartWidget;
