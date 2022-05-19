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
    isFailureResponse(response: any): boolean;
}
export default APIConnector;
