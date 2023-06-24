declare class APIConnector {
    requestOptions: any;
    currentRequestNumber: any;
    completedRequestNumber: any;
    responseFormatter: any;
    setResponseFormatter(): void;
    call(requestOptions?: any): void;
    formatRequestParams(params: any, format: any): any;
    getHelpersToExpose(response: any, formattedResponse: any): any;
    internalSuccessCallback(response: any, formattedResponse: any): void;
    postSuccessCallback(response: any, formattedResponse: any): void;
    getFormattedResponse(response: any): any;
    onSuccessfulResponse(response: any): Promise<void>;
    mutateResponse(formattedResponse: any): Promise<any>;
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
    updateRequestNumber(requestNumber: any): any;
    markRequestComplete(requestNumber: any): any;
    oldRequest(requestNumber: any): boolean;
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
            };
        };
    };
}
export default APIConnector;
