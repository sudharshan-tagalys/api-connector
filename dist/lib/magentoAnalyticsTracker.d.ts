import PlatformAnalyticsTracker from "./platformAnalyticsTracker";
declare class MagentoAnalyticsTracker extends PlatformAnalyticsTracker {
    trackUser(): void;
    track(): void;
}
export default MagentoAnalyticsTracker;
