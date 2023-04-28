"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EVENT_TYPES = void 0;
var PRODUCT_VIEW = "product_view";
var ADD_TO_CART = "add_to_cart";
var BUY = "buy";
var LISTING_PAGE_VIEW = "listing_page_view";
var USER_LOGIN = "user_login";
exports.DEFAULT_EVENT_TYPES = [
    PRODUCT_VIEW,
    ADD_TO_CART,
    BUY,
    LISTING_PAGE_VIEW,
    USER_LOGIN
];
var PlatformAnalyticsTracker = /** @class */ (function () {
    function PlatformAnalyticsTracker(eventTypes) {
        this.eventTypes = eventTypes;
    }
    PlatformAnalyticsTracker.prototype.canTrackProductView = function () {
        return this.eventTypes.includes(PRODUCT_VIEW);
    };
    PlatformAnalyticsTracker.prototype.canTrackAddToCart = function () {
        return this.eventTypes.includes(ADD_TO_CART);
    };
    PlatformAnalyticsTracker.prototype.canTrackBuy = function () {
        return this.eventTypes.includes(BUY);
    };
    PlatformAnalyticsTracker.prototype.canTrackListingPageView = function () {
        return this.eventTypes.includes(LISTING_PAGE_VIEW);
    };
    PlatformAnalyticsTracker.prototype.canTrackUserLogin = function () {
        return this.eventTypes.includes(USER_LOGIN);
    };
    PlatformAnalyticsTracker.prototype.track = function () {
    };
    return PlatformAnalyticsTracker;
}());
exports.default = PlatformAnalyticsTracker;
//# sourceMappingURL=platformAnalyticsTracker.js.map