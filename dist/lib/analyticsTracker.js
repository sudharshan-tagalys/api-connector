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
var Bowser = require("bowser");
var common_1 = require("../utils/common");
var api_1 = require("./api");
var cookie_1 = require("./cookie");
common_1.AppContext.tagalysAnalyticsLastEventTimestamp = false;
common_1.AppContext.tagalysAnalyticsRapidEventSequence = 0;
var AnalyticsTracker = /** @class */ (function () {
    function AnalyticsTracker() {
    }
    AnalyticsTracker.prototype.trackEvent = function (event_type, details) {
        this.track("analytics/events/track", {
            event_type: event_type,
            details: details
        });
    };
    AnalyticsTracker.prototype.track = function (endpoint, trackData, trackerVersion) {
        if (trackerVersion === void 0) { trackerVersion = 3; }
        if (cookie_1.default.isEnabled()) {
            this.bowser = Bowser.getParser(window.navigator.userAgent);
            this.bowser = this.bowser.parsedResult;
            cookie_1.default.batchUpdate([{
                    name: "__ta_device",
                    expiryTime: 63072000000
                }, {
                    name: "__ta_visit",
                    expiryTime: 1800000
                }]);
        }
        var user = {
            device_id: cookie_1.default.get('__ta_device'),
            visit_id: cookie_1.default.get('__ta_visit')
        };
        var secondsSinceLastEvent;
        if (common_1.AppContext.tagalysAnalyticsLastEventTimestamp != false) {
            secondsSinceLastEvent = Math.floor((Date.now() - common_1.AppContext.tagalysAnalyticsLastEventTimestamp) / 1000);
        }
        else {
            secondsSinceLastEvent = 999999;
        }
        if (secondsSinceLastEvent < 2) {
            common_1.AppContext.tagalysAnalyticsRapidEventSequence += 1;
        }
        else {
            common_1.AppContext.tagalysAnalyticsRapidEventSequence = 0;
        }
        common_1.AppContext.tagalysAnalyticsLastEventTimestamp = Date.now();
        var params = __assign(__assign({}, trackData), { rapid_event_sequence: common_1.AppContext.tagalysAnalyticsRapidEventSequence, tracker_version: trackerVersion, device_info: this.getDeviceInfo(), user: user, identification: api_1.default.getIdentification() });
        api_1.default.call('POST', endpoint, {
            params: JSON.stringify(params),
            onSuccess: function (response) {
                cookie_1.default.delete("tagalys-track-async");
                if (trackData.hasOwnProperty('event_type')) {
                    if (trackData.event_type == 'product_action' && response.hasOwnProperty('timestamp')) {
                        cookie_1.default.set('__ta_last_pa_time', response.timestamp.split('T')[1].substring(0, 6), 1200000);
                    }
                }
            }
        });
    };
    AnalyticsTracker.prototype.getDeviceInfo = function () {
        var device_type = this.bowser.platform.type;
        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;
        var device_info = {
            device_type: device_type,
            os: {
                name: this.detectOS()
            },
            browser: {
                name: this.bowser.browser.name,
                version: this.bowser.browser.version
            },
            screen_resolution: {
                width: parseInt("".concat(innerWidth)),
                height: parseInt("".concat(innerHeight))
            }
        };
        return device_info;
    };
    AnalyticsTracker.prototype.detectOS = function () {
        var RELEVANT_OS_DETECTS = [
            'windows',
            'android',
            'ios',
            'mac',
            'linux',
            'chromeos',
            'windowsphone'
        ];
        for (var i = 0; i < RELEVANT_OS_DETECTS.length; i++) {
            if (this.bowser.os.name.toLowerCase() === RELEVANT_OS_DETECTS[i].toLowerCase()) {
                return RELEVANT_OS_DETECTS[i];
            }
        }
        return 'unknown';
    };
    return AnalyticsTracker;
}());
exports.default = new AnalyticsTracker();
//# sourceMappingURL=analyticsTracker.js.map