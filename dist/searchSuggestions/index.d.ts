import APIConnector from "../lib/apiConnector";
declare class SearchSuggestions extends APIConnector {
    getRequestOptions(): {
        path: string;
        params: {
            q: any;
            products: any;
            queries: any;
        };
    };
    extractAnalyticsData(response: any): any;
    onSuccessfulResponse(response: any): void;
    formatRequestParams(params: any): string;
    setQuery(query: any, makeApiRequest: any): void;
    new(requestOptions: any): {
        setQuery: (query: any, makeApiRequest?: boolean) => void;
    };
}
declare const _default: {
    instance: SearchSuggestions;
    defaultRequestOptions: {
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
};
export default _default;
