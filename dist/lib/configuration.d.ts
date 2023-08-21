declare class Configuration {
    private configuration;
    private platformConfiguration;
    setConfiguration(configuration: any): void;
    setPlatformConfiguration(platformConfiguration?: any): void;
    validateConfiguration(configuration: any): void;
    validatePlatformConfiguration(platformConfiguration: any): void;
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
    getStoreId(): any;
    getPlatformConfiguration(): any;
    getExchangeRate(): number;
    getFractionalDigits(): number;
    getCurrency(): any;
    getClientCode(): any;
    isShopify(): boolean;
    isMagento(): boolean;
    isBigCommerce(): boolean;
    getCountryCode(): any;
    isUsingBaseCountryCode(): boolean;
    onFailover(): any;
    get(): any;
}
declare const _default: Configuration;
export default _default;
