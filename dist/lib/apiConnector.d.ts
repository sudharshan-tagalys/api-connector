declare class APIConnector {
    requestOptions: any;
    call(requestOptions: any): void;
    extractAnalyticsData(response: any): any;
    formatResponse(response: any): any;
    getRequestOptions(): {
        method: string;
        path: string;
        headers: {
            contentType: string;
        };
        params: {};
    };
}
export default APIConnector;
