import ShopifyAPI from './lib/shopifyApi';
declare class ProductListingPage {
    private requestState;
    private responseState;
    private queries;
    private graphqlResponseFormatter;
    constructor(requestState: any, responseState: any);
    getSortVariables(): any;
    getPaginationVariables(): {};
    getFilterVariables(): {};
    getMetafieldVariables(): {
        product_metafields: any;
    };
    getQueryVariables(): any;
    getQuery(): string;
    static getFilterInputsQuery(): string;
    getRequestOptions(): {
        path: string;
        apiVersion: string;
    };
    getSortOptions(requestOptions: any): any;
    formatResponse(requestOptions: any, shopifyResponse: any): {
        name: any;
        products: any;
        filters: any;
        sort_options: any;
        page_info: any;
        filter_inputs: {};
    };
    apiClient(): ShopifyAPI;
    getDataForInitialRequest(requestOptions: any): Promise<{
        filtersForRequestParams: {};
        filter_inputs: {};
        price_ranges: {};
    }>;
    helpersToExpose(): {
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
    static export(): {
        ProductListingPage: {
            new: (requestState: any, responseState: any) => {
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
        };
    };
}
export default ProductListingPage;
