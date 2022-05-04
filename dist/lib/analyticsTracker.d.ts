declare class AnalyticsTracker {
    private bowser;
    trackEvent(event_type: any, details: any): void;
    track(endpoint: any, trackData: any, trackerVersion?: number): void;
    getDeviceInfo(): {
        device_type: any;
        os: {
            name: string;
        };
        browser: {
            name: any;
            version: any;
        };
        screen_resolution: {
            width: number;
            height: number;
        };
    };
    detectOS(): string;
}
declare const _default: AnalyticsTracker;
export default _default;
