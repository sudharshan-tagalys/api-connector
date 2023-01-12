import SuggestionsFormatter from "../suggestionsFormatter";
declare class LegacySearchSuggestionsFormatter extends SuggestionsFormatter {
    format(response: any): any;
    getEncodedQueryString(options: any): string;
}
export default LegacySearchSuggestionsFormatter;
