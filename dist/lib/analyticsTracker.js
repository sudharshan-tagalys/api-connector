"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIES = void 0;
var api_1 = require("./api");
var configuration_1 = require("./configuration");
var cookie_1 = require("./cookie");
exports.COOKIES = {
    TA_DEVICE: "__ta_device",
    TA_VISIT: "__ta_visit",
    TA_LAST_PA_TIME: "__ta_last_pa_time"
};
var TRACKER_VERSION = 3;
var AnalyticsTracker = /** @class */ (function () {
    function AnalyticsTracker() {
        this.lastEventTimestamp = false;
        this.analyticsRapidEventSequence = 0;
    }
    AnalyticsTracker.prototype.trackEvent = function (eventType, details) {
        this.track("analytics/events/track", {
            eventType: eventType,
            details: details
        });
    };
    AnalyticsTracker.prototype.track = function (endpoint, _a, trackerVersion) {
        var eventType = _a.eventType, details = _a.details;
        if (trackerVersion === void 0) { trackerVersion = TRACKER_VERSION; }
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
            this.analyticsRapidEventSequence = this.getAnalyticsRapidEventSequence();
            this.lastEventTimestamp = Date.now();
            var params = {
                event_type: eventType,
                details: details,
                rapid_event_sequence: this.analyticsRapidEventSequence,
                tracker_version: trackerVersion,
                device_info: {},
                user: user,
                identification: configuration_1.default.getApiIdentification()
            };
            api_1.default.call('POST', endpoint, {
                params: JSON.stringify(params),
                onSuccess: function (response) {
                    if (eventType && eventType == 'product_action' && response.hasOwnProperty('timestamp')) {
                        var lastProductActionTime = response.timestamp.split('T')[1].substring(0, 6);
                        cookie_1.default.set(exports.COOKIES.TA_LAST_PA_TIME, lastProductActionTime, 1200000);
                    }
                }
            });
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