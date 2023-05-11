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
    getStoreId(): any;
    getPlatformVariables(): any;
    getExchangeRate(): number;
    getFractionalDigits(): number;
    getCurrency(): any;
    getClientCode(): any;
    getStoreFrontAPIAccessToken(): any;
    getMyShopifyDomain(): any;
    isShopify(): boolean;
    isMagento(): boolean;
    isBigCommerce(): boolean;
    getCountryCode(): any;
    isUsingBaseCountryCode(): boolean;
    isUsingMultiCountryCurrency(): boolean;
    waitForStoreFrontAPI(): boolean;
}
declare const _default: Configuration;
export default _default;
