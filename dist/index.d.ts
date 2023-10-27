import packageDetails from "./packageDetails";
export declare const APIConnector: {
    trackEvent: (eventType: any, details: any) => void;
    getPlatformVariable: (variableKey: any) => any;
    cookie: {
        get: (cname: any) => string;
        set: (cname: any, cvalue: any, expiryTime: any) => void;
        delete: (cname: any) => void;
    };
    getPlatformVariables: () => any;
    setQueryStringConfiguration: (config: any) => void;
    isUsingMultiCountryCurrency: () => boolean;
    waitForStoreFrontAPI: () => any;
};
declare const setConfiguration: (config: any) => void;
declare const getConfiguration: () => any;
declare const Analytics: {
    trackPlatformEvents: (eventTypesToTrack?: string[]) => void;
    trackProductView: (identifier: any) => void;
    trackAddToCart: (identifier: any, quantity: any) => void;
    trackOrder: (orderId: any, lineItems: any) => void;
    trackProductListingPageView: (identifier: any) => void;
};
export { Analytics, setConfiguration, getConfiguration, packageDetails, };
