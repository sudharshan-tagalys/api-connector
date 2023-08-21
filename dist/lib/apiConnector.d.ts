declare class APIConnector {
    requestOptions: any;
    currentRequestNumber: any;
    completedRequestNumber: any;
    responseFormatter: any;
    setResponseFormatter(): void;
    apiClient(): any;
    call(requestOptions?: any): Promise<void>;
    formatRequestParams(params: any, format: any): any;
    getHelpersToExpose(response: any, formattedResponse: any): any;
    internalSuccessCallback(response: any, formattedResponse: any): void;
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
            }) => Promise<void>;
            new: (requestOptions?: any, defaultRequestOptions?: {
                onSuccess: (response: any) => void;
                beforeAPICall: (params: any) => any;
                onFailure: (response: any) => void;
            }) => any;
        };
    };
}
export default APIConnector;
