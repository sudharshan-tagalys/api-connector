declare class APIConnector {
    requestOptions: any;
    responseFormatter: any;
    setResponseFormatter(): void;
    call(requestOptions?: any): void;
    formatRequestParams(params: any, format: any): any;
    getHelpersToExpose(type?: string): {};
    internalSuccessCallback(response: any, formattedResponse: any): void;
    onSuccessfulResponse(response: any): void;
    extractAnalyticsData(response: any): any;
    formatResponse(response: any): any;
    getRequestOptions(): {};
    isFailureResponse(response: any): boolean;
    static defaultRequestOptions(): {};
    new(requestOptions: any): any;
    static exporterName(): void;
    static export(): {
        [x: number]: {
            call: (requestOptions: any, defaultRequestOptions?: {}) => void;
            new: (requestOptions: any, defaultRequestOptions?: {}) => any;
        };
    };
}
export default APIConnector;
