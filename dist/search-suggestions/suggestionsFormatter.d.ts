interface Configuration {
    categorySeparator: string;
    hierarchySeparator: string;
}
declare class SuggestionsFormatter {
    protected configuration: Configuration;
    constructor(configuration: Configuration);
    format(response: any): any;
    formatPopularSearches(response: any): any;
}
export default SuggestionsFormatter;
