declare class ShopifyAnalyticsTracker {
    window(): any;
    getShopifyObject(): any;
    getPageMetaData(): any;
    logTrack(event: any, data: any): void;
    trackProductIfExist(): void;
    trackCollectionIfExist(): void;
    trackCartTokenIfExist(): void;
    track(): void;
}
export default ShopifyAnalyticsTracker;
