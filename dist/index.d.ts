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
};
declare const setConfiguration: (config: any) => void;
declare const Analytics: {
    trackPlatformEvents: (eventTypesToTrack?: string[]) => void;
    trackProductView: (identifier: any) => void;
    trackAddToCart: (identifier: any, quantity: any) => void;
    trackOrder: (orderId: any, lineItems: any) => void;
    trackProductListingPageView: (identifier: any) => void;
};
declare const responseFormatter: {
    getFormatter: () => import("./shared/helpers/formatters/formatter").default;
};
export { Analytics, setConfiguration, packageDetails, responseFormatter };
