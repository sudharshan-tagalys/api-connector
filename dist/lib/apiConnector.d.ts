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
    beforeAPICall(params: any): any;
    static defaultRequestOptions(): {
        onSuccess: (response: any) => void;
        beforeAPICall: (params: any) => any;
        onFailure: (response: any) => void;
    };
    new(requestOptions: any): any;
    static exporterName(): void;
    static export(): {
        [x: number]: {
            call: (requestOptions: any, defaultRequestOptions?: {
                onSuccess: (response: any) => void;
                beforeAPICall: (params: any) => any;
                onFailure: (response: any) => void;
            }) => void;
            new: (requestOptions?: {}, defaultRequestOptions?: {
                onSuccess: (response: any) => void;
                beforeAPICall: (params: any) => any;
                onFailure: (response: any) => void;
            }) => {
                helpers: any;
                call: (requestOptions: any) => void;
            };
        };
    };
}
export default APIConnector;
