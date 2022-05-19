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
    trackingConsentProvided: () => boolean;
};
declare const DEFAULT_REQUEST_OPTIONS: {
    onSuccess: (response: any) => void;
    onFailure: (response: any) => void;
};
export { SHOPIFY_PLATFORM, DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS };
