"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageDetails = exports.getConfiguration = exports.setConfiguration = exports.Analytics = exports.APIConnector = void 0;
var configuration_1 = require("./lib/configuration");
var constants_1 = require("./shared/constants");
var similar_products_widget_1 = require("./similar-products-widget");
var smart_widget_1 = require("./smart-widget");
var bought_also_bought_1 = require("./bought-also-bought");
var viewed_also_viewed_1 = require("./viewed-also-viewed");
var added_to_cart_also_added_to_cart_1 = require("./added-to-cart-also-added-to-cart");
var search_suggestions_1 = require("./search-suggestions");
var legacy_1 = require("./search-suggestions/legacy");
var search_1 = require("./search");
var product_lisiting_page_1 = require("./product-lisiting-page");
var queryStringManager_1 = require("./lib/queryStringManager");
var personalized_recommendations_1 = require("./personalized-recommendations");
var recommendations_1 = require("./recommendations");
var cookie_1 = require("./lib/cookie");
var analyticsTracker_1 = require("./lib/analyticsTracker");
var packageDetails_1 = require("./packageDetails");
exports.packageDetails = packageDetails_1.default;
var platformAnalyticsFactory_1 = require("./lib/platformAnalyticsFactory");
var platformAnalyticsTracker_1 = require("./lib/platformAnalyticsTracker");
exports.APIConnector = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, search_1.default.export()), similar_products_widget_1.default.export()), smart_widget_1.default.export()), bought_also_bought_1.default.export()), viewed_also_viewed_1.default.export()), added_to_cart_also_added_to_cart_1.default.export()), personalized_recommendations_1.default.export()), recommendations_1.default.export()), search_suggestions_1.default.export()), legacy_1.default.export()), product_lisiting_page_1.default.export()), { trackEvent: function (eventType, details) { return analyticsTracker_1.default.trackEvent(eventType, details); }, getPlatformVariable: function (variableKey) { return configuration_1.default.getPlatformVariable(variableKey); }, cookie: {
        get: function (cname) { return cookie_1.default.get(cname); },
        set: function (cname, cvalue, expiryTime) { return cookie_1.default.set(cname, cvalue, expiryTime); },
        delete: function (cname) { return cookie_1.default.delete(cname); }
    }, getPlatformVariables: function () { return configuration_1.default.getPlatformVariables(); }, setQueryStringConfiguration: function (config) { return queryStringManager_1.default.setConfiguration(config); }, isUsingMultiCountryCurrency: function () { return configuration_1.default.isUsingMultiCountryCurrency(); }, waitForStoreFrontAPI: function () { return configuration_1.default.waitForStoreFrontAPI(); } });
var setConfiguration = function (config) {
    configuration_1.default.setConfiguration(__assign(__assign({}, constants_1.DEFAULT_CONFIGURATION), config));
};
exports.setConfiguration = setConfiguration;
var getConfiguration = function () {
    return configuration_1.default.getConfiguration();
};
exports.getConfiguration = getConfiguration;
var trackPlatformEvents = function (eventTypesToTrack) {
    if (configuration_1.default.canTrackAnalytics()) {
        platformAnalyticsFactory_1.default.tracker(eventTypesToTrack).track();
    }
    else {
        cookie_1.default.batchDelete(analyticsTracker_1.TAGALYS_ANALYTICS_COOKIES);
    }
};
var Analytics = {
    trackPlatformEvents: function (eventTypesToTrack) {
        if (eventTypesToTrack === void 0) { eventTypesToTrack = platformAnalyticsTracker_1.DEFAULT_EVENT_TYPES; }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                trackPlatformEvents(eventTypesToTrack);
            });
        }
        else {
            trackPlatformEvents(eventTypesToTrack);
        }
    },
    trackProductView: function (identifier) {
        var eventDetails = {
            sku: identifier,
            action: 'view'
        };
        analyticsTracker_1.default.trackEvent('product_action', eventDetails);
    },
    trackAddToCart: function (identifier, quantity) {
        var eventDetails = {
            sku: identifier,
            action: 'add_to_cart',
            quantity: quantity
        };
        analyticsTracker_1.default.trackEvent('product_action', eventDetails);
    },
    trackOrder: function (orderId, lineItems) {
        lineItems.forEach(function (lineItem) {
            var thisOrderEventData = {
                action: 'buy',
                sku: lineItem.identifier,
                quantity: lineItem.quantity,
                order_id: orderId
            };
            analyticsTracker_1.default.trackEvent('product_action', thisOrderEventData);
        });
    },
    trackProductListingPageView: function (identifier) {
        var dataToTrack = {
            pl_type: 'page-platform',
            pl_details: { page_id: identifier }
        };
        analyticsTracker_1.default.trackEvent('product_list', dataToTrack);
    }
};
exports.Analytics = Analytics;
//# sourceMappingURL=index.js.map