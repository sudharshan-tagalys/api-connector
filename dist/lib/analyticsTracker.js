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
exports.TAGALYS_ANALYTICS_COOKIES = exports.COOKIES = void 0;
var api_1 = require("./api");
var configuration_1 = require("./configuration");
var cookie_1 = require("./cookie");
exports.COOKIES = {
    TA_DEVICE: "__ta_device",
    TA_VISIT: "__ta_visit",
    TA_USER_ID: "__ta_user_id",
    TA_LAST_PA_TIME: "__ta_last_pa_time",
    TA_CART: '__ta_cart',
    CART: 'cart',
    TA_LAST_ORDER_ID: '__ta_last_order_id'
};
exports.TAGALYS_ANALYTICS_COOKIES = [
    exports.COOKIES.TA_DEVICE,
    exports.COOKIES.TA_VISIT,
    exports.COOKIES.TA_USER_ID,
    exports.COOKIES.TA_LAST_PA_TIME,
    exports.COOKIES.TA_CART,
    exports.COOKIES.TA_LAST_ORDER_ID
];
var TRACKER_VERSION = 3;
var AnalyticsTracker = /** @class */ (function () {
    function AnalyticsTracker() {
        this.lastEventTimestamp = false;
        this.analyticsRapidEventSequence = 0;
    }
    AnalyticsTracker.prototype.trackEvent = function (eventType, details) {
        this.track("analytics/events/track", {
            event_type: eventType,
            details: details
        });
    };
    AnalyticsTracker.prototype.track = function (endpoint, trackData, trackerVersion) {
        if (trackerVersion === void 0) { trackerVersion = TRACKER_VERSION; }
        if (configuration_1.default.canTrackAnalytics()) {
            if (cookie_1.default.isEnabled()) {
                cookie_1.default.batchUpdate([{
                        name: exports.COOKIES.TA_DEVICE,
                        expiryTime: 63072000000
                    }, {
                        name: exports.COOKIES.TA_VISIT,
                        expiryTime: 1800000
                    }]);
                var user = {
                    device_id: cookie_1.default.get(exports.COOKIES.TA_DEVICE),
                    visit_id: cookie_1.default.get(exports.COOKIES.TA_VISIT)
                };
                var userId = cookie_1.default.get(exports.COOKIES.TA_USER_ID);
                if (userId) {
                    // add user_id to user object for analytics tracking
                    user.user_id = userId;
                }
                this.analyticsRapidEventSequence = this.getAnalyticsRapidEventSequence();
                this.lastEventTimestamp = Date.now();
                var params = __assign(__assign({}, trackData), { rapid_event_sequence: this.analyticsRapidEventSequence, tracker_version: trackerVersion, device_info: {}, identification: __assign(__assign({}, configuration_1.default.getApiIdentification()), { user: user }) });
                api_1.default.call('POST', endpoint, {
                    params: JSON.stringify(params),
                    onSuccess: function (response) {
                        if (trackData.event_type && trackData.event_type == 'product_action' && response.hasOwnProperty('timestamp')) {
                            var lastProductActionTime = response.timestamp.split('T')[1].substring(0, 6);
                            cookie_1.default.set(exports.COOKIES.TA_LAST_PA_TIME, lastProductActionTime, 1200000);
                        }
                    }
                });
            }
        }
        else {
            cookie_1.default.batchDelete(exports.TAGALYS_ANALYTICS_COOKIES);
        }
    };
    AnalyticsTracker.prototype.getAnalyticsRapidEventSequence = function () {
        var secondsSinceLastEvent = 999999;
        var analyticsRapidEventSequence = this.analyticsRapidEventSequence;
        if (this.lastEventTimestamp != false) {
            secondsSinceLastEvent = Math.floor((Date.now() - this.lastEventTimestamp) / 1000);
        }
        if (secondsSinceLastEvent < 2) {
            analyticsRapidEventSequence += 1;
        }
        else {
            analyticsRapidEventSequence = 0;
        }
        return analyticsRapidEventSequence;
    };
    return AnalyticsTracker;
}());
exports.default = new AnalyticsTracker();
//# sourceMappingURL=analyticsTracker.js.map