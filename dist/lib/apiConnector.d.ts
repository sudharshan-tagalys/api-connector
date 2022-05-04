declare class APIConnector {
    requestOptions: any;
    call(requestOptions: any): void;
    canTrackAnalytics(): boolean;
    extractAnalyticsData(data: any): any;
    getRequestOptions(): {
        method: string;
        path: string;
        params: {};
    };
}
export default APIConnector;
