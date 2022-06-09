declare class SuggestionsFormatter {
    private configuration;
    getQueryString(q: any, qf?: {}): string;
    format(response: any, configuration: any): any;
}
export default SuggestionsFormatter;
