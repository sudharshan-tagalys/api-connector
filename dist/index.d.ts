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
    trackNonTagalysAPIEvents: (eventTypesToTrack?: string[]) => void;
};
export { Analytics, setConfiguration, packageDetails, };
