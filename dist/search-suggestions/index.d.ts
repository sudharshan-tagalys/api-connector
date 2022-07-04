import APIConnector from "../lib/apiConnector";
declare class SearchSuggestions extends APIConnector {
    getRequestOptions(): {
        path: string;
        format: string;
        params: {
            products: any;
            queries: any;
            q: any;
        };
    };
    static exporterName(): string;
    extractAnalyticsData(response: any): boolean;
    formatResponse(response: any): any;
    updateQuery(query: any): void;
    setQuery(query: any): void;
    getHelpersToExpose(): {
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
        updateQuery: (...args: any[]) => void;
        recordRecentSearch: (queryString: any) => void;
        removeRecentSearch: (queryString: any) => void;
        getRecentSearches: (limit: any) => any;
        getPopularSearches: (limit: any) => Promise<unknown>;
        getRecentAndPopularSearches: (maxRecentSearches: any, maxTotalSearches: any, callbackOptions?: {}) => Promise<unknown>;
        getEncodedQueryString: (queryParams: any) => string;
        setQuery: (query: any) => void;
    };
    new(requestOptions: any): {
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
        updateQuery: (...args: any[]) => void;
        recordRecentSearch: (queryString: any) => void;
        removeRecentSearch: (queryString: any) => void;
        getRecentSearches: (limit: any) => any;
        getPopularSearches: (limit: any) => Promise<unknown>;
        getRecentAndPopularSearches: (maxRecentSearches: any, maxTotalSearches: any, callbackOptions?: {}) => Promise<unknown>;
        getEncodedQueryString: (queryParams: any) => string;
        setQuery: (query: any) => void;
    };
    getSearchesToDisplay(recentSearches: any, popularSearches: any, maxRecentSearches: any, maxTotalSearches: any): any;
    getRecentAndPopularSearches(maxRecentSearches: any, maxTotalSearches: any, callbackOptions?: any): Promise<unknown>;
    getPopularSearches(limit: any): Promise<unknown>;
    getRecentSearches(limit: any): any;
    static defaultRequestOptions(): {
        params: {
            request: {
                products: number;
                queries: number;
            };
        };
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
