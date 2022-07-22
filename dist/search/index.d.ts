import Base from "../lib/plp-base";
declare class Search extends Base {
    searchHelpers: any;
    getDefaultRequestState: () => {
        query: string;
        queryMode: string;
        filters: {};
        queryFilters: {};
        request: string[];
        page: number;
        perPage: number;
        sort: string;
    };
    getDefaultResponseState: () => {
        query: string;
        total_pages: any;
        page: any;
        total: any;
        query_mode: any;
        products: any[];
        filters: any[];
        sort_options: any[];
    };
    constructor();
    static exporterName(): string;
    getRequestOptions(): {
        path: string;
        params: any;
    };
    extractAnalyticsData(response: any): false | {
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
    getRequestStateFromParams(params: any): any;
    getRequestParams(state: any): any;
    getEncodedQueryString(except?: any[]): string;
    commonHelpers(): {
        recordRecentSearch: (queryString: any) => void;
        getEncodedQueryString: (requestParameters: any) => string;
        getEncodedQueryStringFromRequestState: (except?: any[]) => any;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getRequestState: () => any;
        getRequestParams: () => any;
        getResponseState: () => any;
    };
    getHelpers(type: any): any;
}
export default Search;
