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
    static defaultRequestOptions(): {
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
    };
    new(requestOptions: any): any;
    static exporterName(): void;
    static export(): {
        [x: number]: {
            call: (requestOptions: any, defaultRequestOptions?: {
                onSuccess: (response: any) => void;
                onFailure: (response: any) => void;
            }) => void;
            new: (requestOptions: any, defaultRequestOptions?: {
                onSuccess: (response: any) => void;
                onFailure: (response: any) => void;
            }) => any;
        };
    };
}
export default APIConnector;
