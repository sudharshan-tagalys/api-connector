import APIConnector from "../lib/apiConnector";
declare class SearchSuggestions extends APIConnector {
    getDefaultResponseState: () => {
        products: any[];
        queries: any[];
    };
    responseState: {
        products: any[];
        queries: any[];
    };
    getRequestOptions(): {
        path: string;
        params: {
            request: {
                products: {
                    limit: number;
                };
            };
            q: any;
        };
    };
    static exporterName(): string;
    extractAnalyticsData(response: any): boolean;
    formatResponse(response: any): any;
    updateQuery(query: any): void;
    setQuery(query: any): void;
    getHelpersToExpose(response: any, formattedResponse: any): any;
    new(requestOptions: any): any;
    getSearchesToDisplay(recentSearches: any, popularSearches: any, maxRecentSearches: any, maxTotalSearches: any): any;
    getRecentAndPopularSearches(maxRecentSearches: any, maxTotalSearches: any, callbackOptions?: any): Promise<unknown>;
    getPopularSearches(limit: any): Promise<unknown>;
    getRecentSearches(limit: any): any;
    internalSuccessCallback(_: any, formattedResponse: any): void;
    setResponseState(state: any): void;
    static defaultRequestOptions(): {
        params: {
            request: {
                products: {
                    limit: number;
                };
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
