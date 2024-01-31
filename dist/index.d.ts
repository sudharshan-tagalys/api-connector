import packageDetails from "./packageDetails";
export declare const APIConnector: {
    cookie: {
        get: (cname: any) => string;
        set: (cname: any, cvalue: any, expiryTime: any) => void;
        delete: (cname: any) => void;
    };
    setQueryStringConfiguration: (config: any) => void;
    getQueryStringConfiguration: () => any;
    hasFailedOver: () => boolean;
    failoverSimulator: {
        activate: () => void;
        deactivate: () => void;
    };
};
declare const setConfiguration: (config: any) => Promise<void>;
declare const getConfiguration: () => any;
declare const getPlatformConfiguration: () => any;
declare const setPlatformConfiguration: (platformConfiguration: any) => void;
declare const Analytics: {
    trackPlatformEvents: (eventTypesToTrack?: string[]) => void;
    trackProductView: (identifier: any) => void;
    trackAddToCart: (identifier: any, quantity: any) => void;
    trackOrder: (orderId: any, lineItems: any) => void;
    trackProductListingPageView: (identifier: any) => void;
    trackEvent: (eventType: any, details: any) => void;
};
declare const getResponseFormatter: () => import("./shared/helpers/formatters/shopifyResponseFormatter").default | import("./shared/helpers/formatters/formatter").default;
export { Analytics, getConfiguration, setPlatformConfiguration, getPlatformConfiguration, setConfiguration, packageDetails, getResponseFormatter, };
