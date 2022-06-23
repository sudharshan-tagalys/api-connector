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
        request: any[];
        page: number;
        perPage: number;
        sortField: any;
        sortDirection: any;
        cache: boolean;
    };
    responseState: {
        filters: any[];
        sort_options: any[];
        page: any;
        total_pages: any;
        products: any[];
        variables: any[];
        banners: any[];
    };
    constructor();
    bindThisToHelpers(helpers: object): {};
    setResponseState(responseState: any): void;
    setRequestState(mutationCallback: any): void;
    getRequestOptions(): {
        path: string;
        params: any;
    };
    static exporterName(): string;
    extractAnalyticsData(response: any): {
        event_type: string;
        event_details: {
            pl_type: string;
            pl_details: {
                q: string;
                qm: string;
                f: {};
            };
            pl_products: any;
            pl_page: number;
            pl_total: any;
        };
    };
    formatResponse(response: any): any;
    getRequestStateFromParams(params: any): {
        query: string;
        queryMode: string;
        filters: {};
        queryFilters: {};
        request: any[];
        page: number;
        perPage: number;
        sortField: any;
        sortDirection: any;
        cache: boolean;
    };
    getParamsFromRequestState(): any;
    getSortString(): any;
    isRequested(requestItem: any): boolean;
    getEncodedQueryString(): string;
    getQueryStringHelpers(): {
        getEncodedQueryString: any;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
    };
    internalSuccessCallback(_: any, formattedResponse: any): void;
    getHelpersToExpose(type?: string): any;
    new(requestOptions: any): any;
    static defaultRequestOptions(): {
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
    };
}
export default Search;
