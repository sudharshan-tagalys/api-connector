import APIConnector from "../lib/apiConnector";
declare class Search extends APIConnector {
    filterHelpers: any;
    paginationHelpers: any;
    searchHelpers: any;
    sortOptionHelpers: any;
    productHelpers: any;
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
        query_original: any;
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
    addToRecentSearch(): void;
    getRequestOptions(): {
        path: string;
        params: any;
    };
    extractAnalyticsData(response: any): {
        event_type: string;
        event_details: {
            pl_type: string;
            pl_details: {
                q: string;
                qm: string;
                f: {};
            };
            pl_page: number;
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
    getFilterParams(filters: object): {};
    getSortString(): string;
    isRequested(requestItem: any): boolean;
    getEncodedQueryString(except?: any[]): string;
    commonHelpers(): {
        getEncodedQueryString: (except?: any[]) => any;
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
        getResponseState: () => {
            query: string;
            total_pages: any;
            page: any;
            total: any;
            query_original: any;
            query_mode: any;
            products: any[];
            filters: any[];
            sort_options: any[];
        };
        addToRecentSearch: () => void;
    };
    internalSuccessCallback(_: any, formattedResponse: any): void;
    getHelpersToExpose(type?: string): any;
    setRequestParamsFromRequestState(): void;
    beforeAPICall(_: any): any;
    new(requestOptions: any): any;
}
export default Search;
