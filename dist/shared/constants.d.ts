declare const SHOPIFY_PLATFORM = "shopify";
declare const DEFAULT_CONFIGURATION: {
    platform: string;
    apiClient: {
        vendor: string;
        language: string;
        version: string;
        release: string;
    };
    track: boolean;
    analyticsStorageConsentProvided: () => boolean;
};
declare const DEFAULT_REQUEST_OPTIONS: {
    configuration: {};
    onSuccess: (response: any) => void;
    onFailure: (response: any) => void;
};
declare const REQUEST_FORMAT: {
    FORM_DATA: string;
    JSON: string;
};
export { SHOPIFY_PLATFORM, DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS, REQUEST_FORMAT };
