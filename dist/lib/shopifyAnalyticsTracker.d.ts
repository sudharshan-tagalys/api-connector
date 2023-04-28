import PlatformAnalyticsTracker from './platformAnalyticsTracker';
declare class ShopifyAnalyticsTracker extends PlatformAnalyticsTracker {
    window(): any;
    getShopifyObject(): any;
    getCheckoutObject(): any;
    getPageMetaData(): any;
    logTrack(event: any, data: any): void;
    trackProductIfExist(): void;
    trackCollectionIfExist(): void;
    trackCartTokenIfExist(): void;
    trackOrderIfExist(): void;
    track(): void;
}
export default ShopifyAnalyticsTracker;
