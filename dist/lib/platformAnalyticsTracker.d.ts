export declare const DEFAULT_EVENT_TYPES: string[];
declare class PlatformAnalyticsTracker {
    eventTypes: any;
    constructor(eventTypes: any);
    canTrackProductView(): any;
    canTrackAddToCart(): any;
    canTrackBuy(): any;
    canTrackListingPageView(): any;
    canTrackUserLogin(): any;
    track(): void;
}
export default PlatformAnalyticsTracker;
