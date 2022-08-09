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
    ShopifyAnalyticsTracker.prototype.getCheckoutObject = function () {
        if (this.getShopifyObject()) {
            var shopifyObject = this.getShopifyObject();
            if (shopifyObject.checkout) {
                return shopifyObject.checkout;
            }
            return false;
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
        // console.log("TRACKING event: " + event, data)
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
                analyticsTracker_1.default.track('analytics/cart_token/track', dataToTrack);
                cookie_1.default.set(analyticsTracker_1.COOKIES.TA_CART, cartToken, 8640000);
            }
        }
    };
    ShopifyAnalyticsTracker.prototype.trackOrderIfExist = function () {
        if (this.getCheckoutObject()) {
            var checkout = this.getCheckoutObject();
            var checkoutTime = new Date(checkout.created_at);
            var currentDateTime = new Date();
            var hoursSinceOrderCreation = (currentDateTime - checkoutTime) / 3600000;
            if (hoursSinceOrderCreation < (24 * 30)) {
                // checkout started within last 30 days
                var lastTrackedOrderId = cookie_1.default.get(analyticsTracker_1.COOKIES.TA_LAST_ORDER_ID);
                var orderId = (checkout.order_id + '');
                if (lastTrackedOrderId != orderId) {
                    cookie_1.default.set(analyticsTracker_1.COOKIES.TA_LAST_ORDER_ID, orderId, 24 * 60 * 60 * 1000);
                    for (var i = 0; i < checkout.line_items.length; i++) {
                        var thisOrderEventData = {
                            action: 'buy',
                            sku: (checkout.line_items[i].product_id + ''),
                            quantity: checkout.line_items[i].quantity,
                            order_id: orderId
                        };
                        this.logTrack("product_action", thisOrderEventData);
                        analyticsTracker_1.default.trackEvent('product_action', thisOrderEventData);
                    }
                }
            }
        }
    };
    ShopifyAnalyticsTracker.prototype.track = function () {
        this.trackProductIfExist();
        this.trackCollectionIfExist();
        this.trackCartTokenIfExist();
        this.trackOrderIfExist();
    };
    return ShopifyAnalyticsTracker;
}());
exports.default = ShopifyAnalyticsTracker;
//# sourceMappingURL=shopifyAnalyticsTracker.js.map