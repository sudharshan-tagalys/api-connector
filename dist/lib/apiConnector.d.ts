declare class APIConnector {
    requestOptions: any;
    responseFormatter: any;
    setResponseFormatter(): void;
    call(requestOptions: any): void;
    formatRequestParams(params: any): string;
    onSuccessfulResponse(response: any): void;
    extractAnalyticsData(response: any): any;
    formatResponse(response: any): any;
    getRequestOptions(): {};
    isFailureResponse(response: any): boolean;
}
export default APIConnector;
