import SearchSuggestions from "..";
declare class LegacySearchSuggestions extends SearchSuggestions {
    getRequestOptions(): {
        path: string;
        format: string;
        params: any;
    };
    static exporterName(): string;
    formatResponse(response: any): any;
    static defaultRequestOptions(): any;
}
export default LegacySearchSuggestions;
