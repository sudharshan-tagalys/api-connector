export declare const COOKIES: {
    TA_DEVICE: string;
    TA_VISIT: string;
    TA_LAST_PA_TIME: string;
};
declare class AnalyticsTracker {
    private lastEventTimestamp;
    private analyticsRapidEventSequence;
    constructor();
    trackEvent(eventType: any, details: any): void;
    track(endpoint: any, { eventType, details }: {
        eventType: any;
        details: any;
    }, trackerVersion?: number): void;
    getAnalyticsRapidEventSequence(): any;
}
declare const _default: AnalyticsTracker;
export default _default;
