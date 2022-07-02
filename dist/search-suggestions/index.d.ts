import APIConnector from "../lib/apiConnector";
declare class SearchSuggestions extends APIConnector {
    getRequestOptions(): {
        path: string;
        format: string;
        params: {
            q: any;
            products: any;
            queries: any;
        };
    };
    static exporterName(): string;
    extractAnalyticsData(response: any): boolean;
    formatResponse(response: any): any;
    setQuery(query: any, callAPI?: boolean): void;
    getHelpersToExpose(): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addToRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
    };
    new(requestOptions: any): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addToRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
    };
    getSearchesToDisplay(recentSearches: any, popularSearches: any): any;
    getPopularSearches(): Promise<unknown>;
    static defaultRequestOptions(): {
        configuration: {
            categorySeparator: string;
            hierarchySeparator: string;
        };
        onSuccess: (response: any) => void;
        beforeAPICall: (params: any) => any;
        onFailure: (response: any) => void;
    };
}
export default SearchSuggestions;
