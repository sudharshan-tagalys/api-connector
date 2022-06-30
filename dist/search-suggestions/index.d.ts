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
    extractAnalyticsData(response: any): any;
    formatResponse(response: any): any;
    setQuery(query: any, callAPI?: boolean): void;
    getHelpersToExpose(): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
    };
    new(requestOptions: any): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getRequestParamsFromQueryString: (queryString: any) => {};
        getRequestParamsFromWindowLocation: () => {};
    };
    getPopularSearches(): Promise<unknown>;
    addRecentSearch(displayString: string): void;
    removeRecentSearch(displayString: string): void;
    static defaultRequestOptions(): {
        configuration: {
            queryString: {
                query: string;
                queryFilter: string;
            };
            categorySeperator: string;
            hierachySeperator: string;
        };
        onSuccess: (response: any) => void;
        beforeAPICall: (params: any) => any;
        onFailure: (response: any) => void;
    };
}
export default SearchSuggestions;
