import ProductListingPage from '../../index';
declare class ShopifyProductListingPage extends ProductListingPage {
    constructor();
    platformHelper(): {
        getQuery: () => string;
        getQueryVariables: () => any;
        formatResponse: (requestOptions: any, shopifyResponse: any) => {
            name: any;
            products: any;
            filters: any;
            sort_options: any;
            page_info: any;
            filter_inputs: {};
        };
        getFilterInputs: (filtersFromResponse: any) => {};
        getDataForInitialRequest: (requestOptions: any) => Promise<{
            filtersForRequestParams: {};
            filter_inputs: {};
            price_ranges: {};
        }>;
    };
    apiClient(): import("../../../shared/platform-helpers/lib/shopifyApi").default;
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
    formatResponse(response: any): {
        name: any;
        products: any;
        filters: any;
        sort_options: any;
        page_info: any;
        filter_inputs: {};
    };
    getRequestStateFromParams(params: any): any;
    getRequestParams(state: any): any;
    getEncodedQueryString(except?: any[]): string;
    getRequestParamsFromWindowLocation(): {};
    mutateResponse(formattedResponse: any): Promise<any>;
    static exporterName(): string;
}
export default ShopifyProductListingPage;
