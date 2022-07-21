import Base from "../lib/plp-base";
declare class ProductListingPage extends Base {
    getDefaultRequestState: () => {
        product_listing_page_id: string;
        filters: {};
        request: string[];
        page: number;
        perPage: number;
        sort: string;
    };
    getDefaultResponseState: () => {
        name: string;
        total_pages: any;
        page: any;
        total: any;
        products: any[];
        filters: any[];
        sort_options: any[];
        banners: any[];
        variants: any[];
    };
    static exporterName(): string;
    getRequestOptions(): {
        path: string;
        params: any;
    };
    extractAnalyticsData(response: any): {
        event_type?: undefined;
        event_details?: undefined;
    } | {
        event_type: string;
        event_details: {
            pl_type: string;
            pl_details: {
                q: any;
                qm: any;
            };
            pl_products: any[];
            pl_page: any;
            pl_total: any;
        };
    };
    formatResponse(response: any): any;
    setRequestParamsFromRequestState(): void;
    getRequestStateFromParams(params: any): {
        product_listing_page_id: string;
        filters: {};
        request: string[];
        page: number;
        perPage: number;
        sort: string;
    };
    getRequestParams(state: any): any;
    getEncodedQueryString(except?: any[]): string;
    commonHelpers(): {
        getEncodedQueryString: (requestParameters: any) => string;
        getEncodedQueryStringFromRequestState: (except?: any[]) => any;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getRequestState: () => any;
        getRequestParams: () => any;
        getResponseState: () => any;
    };
}
export default ProductListingPage;
