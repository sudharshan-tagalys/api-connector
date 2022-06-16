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
    onSuccessfulResponse(response: any): void;
    setQuery(query: any, callAPI?: boolean): void;
    new(requestOptions: any): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
        getUrlEncodedQueryString: (baseUrl: any, params: any) => string;
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
        onFailure: (response: any) => void;
    };
}
export default SearchSuggestions;
