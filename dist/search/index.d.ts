import APIConnector from "../lib/apiConnector";
declare class Search extends APIConnector {
    filterHelpers: any;
    paginationHelpers: any;
    searchHelpers: any;
    sortOptionHelpers: any;
    productHelpers: any;
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
    requestState: {
        query: string;
        queryMode: string;
        filters: {};
        queryFilters: {};
        request: string[];
        page: number;
        perPage: number;
        sort: string;
    };
    responseState: {
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
    bindThisToHelpers(helpers: object): {};
    setResponseState(responseState: any): void;
    setRequestState(mutationCallback: any, callAPI?: boolean): void;
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
    getRequestStateFromParams(params: any): {
        query: string;
        queryMode: string;
        filters: {};
        queryFilters: {};
        request: string[];
        page: number;
        perPage: number;
        sort: string;
    };
    getParamsFromRequestState(): any;
    getRequestParams(state: any): any;
    getFilterParams(filters: object): object;
    getSortString(): string;
    isRequested(requestItem: any): boolean;
    getEncodedQueryString(except?: any[]): string;
    commonHelpers(): {
        getEncodedQueryString: (requestParameters: any) => string;
        getEncodedQueryStringFromRequestState: (except?: any[]) => any;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getRequestState: () => {
            query: string;
            queryMode: string;
            filters: {};
            queryFilters: {};
            request: string[];
            page: number;
            perPage: number;
            sort: string;
        };
        getRequestParams: () => {
            query: string;
            queryMode: string;
            filters: {};
            queryFilters: {};
            request: string[];
            page: number;
            perPage: number;
            sort: string;
        };
        getResponseState: () => {
            query: string;
            total_pages: any;
            page: any;
            total: any;
            query_mode: any;
            products: any[];
            filters: any[];
            sort_options: any[];
        };
        recordRecentSearch: (queryString: any) => void;
    };
    internalSuccessCallback(_: any, formattedResponse: any): void;
    getHelpers(type: any): any;
    getHelpersToExpose(response?: boolean): any;
    setRequestParamsFromRequestState(): void;
    beforeAPICall(_: any): any;
    new(requestOptions: any): any;
}
export default Search;
