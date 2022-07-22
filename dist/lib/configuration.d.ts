declare class Configuration {
    private configuration;
    setConfiguration(configuration: any): void;
    validateConfiguration(configuration: any): void;
    getConstructedErrorLabel(missingConfiguration: any): string;
    getConfiguration(): any;
    getServerUrl(): any;
    getApiIdentification(): {
        client_code: any;
        api_key: any;
        store_id: any;
        currency: any;
        api_client: {
            vendor: any;
            language: any;
            version: any;
            release: any;
        };
    };
    getPlatform(): any;
    analyticsStorageConsentProvided(): any;
    canTrackAnalytics(): any;
    getPlatformVariable(key: any): any;
    getPlatformVariables(): any;
}
declare const _default: Configuration;
export default _default;
