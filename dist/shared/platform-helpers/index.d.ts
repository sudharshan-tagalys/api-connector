import ShopifyAPI from "./lib/shopifyApi";
declare const _default: {
    MultiMarket: {
        new: () => {
            updateProductDetailsForMarket: (response: any) => Promise<any>;
            resetProductPrices: (response: any) => any;
        };
    };
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
    TagalysToCommonResponseFormatter: {
        new: () => {
            formatDetail: (detail: any) => any;
        };
    };
    apiClient: () => ShopifyAPI;
};
export default _default;
