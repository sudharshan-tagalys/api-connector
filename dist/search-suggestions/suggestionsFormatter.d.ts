interface Configuration {
    categorySeparator: string;
    hierarchySeparator: string;
}
declare class SuggestionsFormatter {
    private configuration;
    constructor(configuration: Configuration);
    format(response: any): any;
}
export default SuggestionsFormatter;
