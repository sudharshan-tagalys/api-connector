import packageDetails from "./packageDetails";
export declare const APIConnector: {
    trackEvent: (eventType: any, details: any) => void;
    cookie: {
        get: (cname: any) => string;
        set: (cname: any, cvalue: any, expiryTime: any) => void;
        delete: (cname: any) => void;
    };
    setQueryStringConfiguration: (config: any) => void;
    hasFailedOver: () => boolean;
    failoverSimulator: {
        activate: () => any;
        deactivate: () => void;
    };
};
declare const setConfiguration: (config: any) => Promise<void>;
declare const getConfiguration: () => any;
declare const getPlatformConfiguration: () => any;
declare const Analytics: {
    trackPlatformEvents: (eventTypesToTrack?: string[]) => void;
    trackProductView: (identifier: any) => void;
    trackAddToCart: (identifier: any, quantity: any) => void;
    trackOrder: (orderId: any, lineItems: any) => void;
    trackProductListingPageView: (identifier: any) => void;
};
declare const getResponseFormatter: () => import("./shared/helpers/formatters/shopifyResponseFormatter").default | import("./shared/helpers/formatters/formatter").default;
export { Analytics, getConfiguration, getPlatformConfiguration, setConfiguration, packageDetails, getResponseFormatter, };
