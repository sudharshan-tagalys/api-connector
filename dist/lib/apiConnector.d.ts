declare class APIConnector {
    requestOptions: any;
    call(requestOptions: any): void;
    extractAnalyticsData(data: any): any;
    getRequestOptions(): {
        method: string;
        path: string;
        params: {};
    };
}
export default APIConnector;
