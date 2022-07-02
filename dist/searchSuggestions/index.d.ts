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
    exporterName(): string;
    extractAnalyticsData(response: any): any;
    onSuccessfulResponse(response: any): void;
    setQuery(query: any, callAPI?: boolean): void;
    new(requestOptions: any): {
        setQuery: (query: any, callAPI?: boolean) => void;
        getPopularSearches: () => Promise<unknown>;
        addRecentSearch: (query: any) => void;
        removeRecentSearch: (query: any) => void;
    };
    getPopularSearches(): Promise<unknown>;
    addRecentSearch(displayString: string): void;
    removeRecentSearch(displayString: string): void;
    defaultRequestOptions(): {
        configuration: {
            queryString: {
                query: string;
                queryFilters: string;
            };
            categorySeperator: string;
            hierachySeperator: string;
        };
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
    };
}
declare const _default: SearchSuggestions;
export default _default;
