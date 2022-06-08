declare class SuggestionsFormatter {
    private configuration;
    getQueryString(q: any, qf?: {}): string;
    format(response: any, configuration: any): any;
}
declare const _default: SuggestionsFormatter;
export default _default;
