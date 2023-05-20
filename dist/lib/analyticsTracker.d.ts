export declare const COOKIES: {
    TA_DEVICE: string;
    TA_VISIT: string;
    TA_USER_ID: string;
    TA_LAST_PA_TIME: string;
    TA_CART: string;
    CART: string;
    TA_LAST_ORDER_ID: string;
};
export declare const TAGALYS_ANALYTICS_COOKIES: string[];
declare class AnalyticsTracker {
    private lastEventTimestamp;
    private analyticsRapidEventSequence;
    constructor();
    trackEvent(eventType: any, details: any): void;
    track(endpoint: any, trackData: any, trackerVersion?: number): void;
    getAnalyticsRapidEventSequence(): any;
}
declare const _default: AnalyticsTracker;
export default _default;
