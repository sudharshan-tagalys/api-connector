import ProductListingPage from '../../index';
declare class ShopifyProductListingPage extends ProductListingPage {
    constructor();
    platformHelper(): any;
    apiClient(): any;
    resetPagination(requestState: any): void;
    getDefaultRequestState: () => any;
    getDefaultResponseState: () => any;
    handleInitialRequest(requestOptions: any): Promise<void>;
    call(initialRequestOptions: any): Promise<void>;
    formatRequestParams(params: any, format: any): string;
    getRequestOptions(): {
        params: any;
        path: string;
        format: string;
    };
    formatResponse(response: any): any;
    getRequestStateFromParams(params: any): any;
    getRequestParams(state: any): any;
    getEncodedQueryString(except?: any[]): string;
    getRequestParamsFromWindowLocation(): {};
    mutateResponse(formattedResponse: any): Promise<any>;
    static exporterName(): string;
}
export default ShopifyProductListingPage;
