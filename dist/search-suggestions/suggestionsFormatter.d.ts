interface Configuration {
    categorySeperator: string;
    hierachySeperator: string;
}
declare class SuggestionsFormatter {
    private configuration;
    constructor(configuration: Configuration);
    format(response: any): any;
}
export default SuggestionsFormatter;
