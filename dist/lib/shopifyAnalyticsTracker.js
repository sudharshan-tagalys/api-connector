"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analyticsTracker_1 = require("./analyticsTracker");
var cookie_1 = require("./cookie");
var ShopifyAnalyticsTracker = /** @class */ (function () {
    function ShopifyAnalyticsTracker() {
    }
    ShopifyAnalyticsTracker.prototype.window = function () {
        var _window = window;
        return _window;
    };
    ShopifyAnalyticsTracker.prototype.getShopifyObject = function () {
        if (typeof (this.window().Shopify) != 'undefined') {
            return this.window().Shopify;
        }
        return false;
    };
    ShopifyAnalyticsTracker.prototype.getPageMetaData = function () {
        var meta = this.window().meta;
        if (typeof meta !== "undefined") {
            if (typeof meta["page"] !== "undefined") {
                return meta;
            }
        }
        return false;
    };
    ShopifyAnalyticsTracker.prototype.logTrack = function (event, data) {
        console.log("TRACKING event: " + event, data);
    };
    ShopifyAnalyticsTracker.prototype.trackProductIfExist = function () {
        if (this.getPageMetaData()) {
            var metaData = this.getPageMetaData();
            if (metaData.page.pageType == 'product') {
                var dataToTrack = {
                    sku: (metaData.page.resourceId + ''),
                    action: 'view'
                };
                this.logTrack("product_action", dataToTrack);
                analyticsTracker_1.default.trackEvent('product_action', dataToTrack);
            }
        }
    };
    ShopifyAnalyticsTracker.prototype.trackCollectionIfExist = function () {
        if (this.getPageMetaData()) {
            var metaData = this.getPageMetaData();
            if (metaData.page.pageType == 'collection') {
                var dataToTrack = {
                    pl_type: 'page-platform',
                    pl_details: { page_id: metaData.page.resourceId }
                };
                this.logTrack("product_list", dataToTrack);
                analyticsTracker_1.default.trackEvent('product_list', dataToTrack);
            }
        }
    };
    ShopifyAnalyticsTracker.prototype.trackCartTokenIfExist = function () {
        var cartToken = cookie_1.default.get(analyticsTracker_1.COOKIES.CART);
        if (cartToken == '') {
            cookie_1.default.delete(analyticsTracker_1.COOKIES.TA_CART);
        }
        else {
            // cart token exists
            var trackedCartToken = cookie_1.default.get(analyticsTracker_1.COOKIES.TA_CART);
            if (trackedCartToken != cartToken) {
                // not tracked
                var dataToTrack = { cart_token: cartToken };
                this.logTrack("analytics/cart_token/track", dataToTrack);
                analyticsTracker_1.default.trackEvent('analytics/cart_token/track', dataToTrack);
                cookie_1.default.set(analyticsTracker_1.COOKIES.TA_CART, cartToken, 8640000);
            }
        }
    };
    ShopifyAnalyticsTracker.prototype.track = function () {
        this.trackProductIfExist();
        this.trackCollectionIfExist();
        this.trackCartTokenIfExist();
    };
    return ShopifyAnalyticsTracker;
}());
exports.default = ShopifyAnalyticsTracker;
//# sourceMappingURL=shopifyAnalyticsTracker.js.map