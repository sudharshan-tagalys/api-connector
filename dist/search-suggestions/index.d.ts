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
        updateQuery: (...args: any[]) => void;
        setQuery: (query: any) => void;
        getPopularSearches: (callbackOptions?: {}) => Promise<unknown>;
        addToRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
    };
    new(requestOptions: any): {
        updateQuery: (...args: any[]) => void;
        setQuery: (query: any) => void;
        getPopularSearches: (callbackOptions?: {}) => Promise<unknown>;
        addToRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
        getURLEncodedQueryString: (baseUrl: any, params: any) => string;
    };
    getSearchesToDisplay(recentSearches: any, popularSearches: any): any;
    getPopularSearches(callbackOptions?: any): Promise<unknown>;
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
