declare class APIConnector {
    requestOptions: any;
    responseFormatter: any;
    setResponseFormatter(): void;
    call(requestOptions: any): void;
    formatRequestParams(params: any, format: any): any;
    onSuccessfulResponse(response: any): void;
    extractAnalyticsData(response: any): any;
    formatResponse(response: any): any;
    getRequestOptions(): {};
    isFailureResponse(response: any): boolean;
    defaultRequestOptions(): {};
    new(requestOptions: any): any;
    exporterName(): void;
    export(): {
        [x: number]: {
            call: (requestOptions: any, defaultRequestOptions?: {}) => void;
            new: (requestOptions: any, defaultRequestOptions?: {}) => void;
        };
    };
}
export default APIConnector;
