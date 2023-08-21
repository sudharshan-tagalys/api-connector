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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseFormatter = exports.packageDetails = exports.setConfiguration = exports.getPlatformConfiguration = exports.setPlatformConfiguration = exports.getConfiguration = exports.Analytics = exports.APIConnector = void 0;
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
var formatFactory_1 = require("./shared/helpers/formatters/formatFactory");
var shopify_1 = require("./product-lisiting-page/platform/shopify");
var failover_1 = require("./lib/failover");
var platform_helpers_1 = require("./shared/platform-helpers");
exports.APIConnector = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, search_1.default.export()), similar_products_widget_1.default.export()), smart_widget_1.default.export()), bought_also_bought_1.default.export()), viewed_also_viewed_1.default.export()), added_to_cart_also_added_to_cart_1.default.export()), personalized_recommendations_1.default.export()), recommendations_1.default.export()), search_suggestions_1.default.export()), legacy_1.default.export()), product_lisiting_page_1.default.export()), shopify_1.default.export()), { trackEvent: function (eventType, details) { return analyticsTracker_1.default.trackEvent(eventType, details); }, cookie: {
        get: function (cname) { return cookie_1.default.get(cname); },
        set: function (cname, cvalue, expiryTime) { return cookie_1.default.set(cname, cvalue, expiryTime); },
        delete: function (cname) { return cookie_1.default.delete(cname); }
    }, setQueryStringConfiguration: function (config) { return queryStringManager_1.default.setConfiguration(config); }, getQueryStringConfiguration: function () { return queryStringManager_1.default.getConfiguration(); }, hasFailedOver: function () { return failover_1.default.hasFailedOver(); }, failoverSimulator: {
        activate: function () { return failover_1.default.activate(); },
        deactivate: function () { return failover_1.default.deactivate(); }
    } });
var setConfiguration = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        configuration_1.default.setConfiguration(__assign(__assign({}, constants_1.DEFAULT_CONFIGURATION), config));
        // if (failover.hasFailedOver()) {
        //   failover.pollUntilAPIisHealthy()
        // }
        (0, platform_helpers_1.setGlobalContextToPlatformHelpers)();
        return [2 /*return*/];
    });
}); };
exports.setConfiguration = setConfiguration;
var getConfiguration = function () {
    return configuration_1.default.get();
};
exports.getConfiguration = getConfiguration;
var getPlatformConfiguration = function () {
    return configuration_1.default.getPlatformConfiguration();
};
exports.getPlatformConfiguration = getPlatformConfiguration;
var setPlatformConfiguration = function (platformConfiguration) {
    configuration_1.default.setPlatformConfiguration(platformConfiguration);
    (0, platform_helpers_1.setGlobalContextToPlatformHelpers)();
};
exports.setPlatformConfiguration = setPlatformConfiguration;
var Analytics = {
    trackPlatformEvents: function (eventTypesToTrack) {
        if (eventTypesToTrack === void 0) { eventTypesToTrack = platformAnalyticsTracker_1.DEFAULT_EVENT_TYPES; }
        if (configuration_1.default.canTrackAnalytics()) {
            platformAnalyticsFactory_1.default.tracker(eventTypesToTrack).track();
        }
        else {
            cookie_1.default.batchDelete(analyticsTracker_1.TAGALYS_ANALYTICS_COOKIES);
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
var getResponseFormatter = function () {
    return formatFactory_1.default.responseFormatter();
};
exports.getResponseFormatter = getResponseFormatter;
//# sourceMappingURL=index.js.map