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
var api_1 = require("../utils/api");
var analyticsTracker_1 = require("./analyticsTracker");
var api_2 = require("./api");
var DEFAULT_REQUEST_OPTIONS = {
    method: "POST",
    path: "",
    params: {}
};
var APIConnector = /** @class */ (function () {
    function APIConnector() {
    }
    APIConnector.prototype.call = function (requestOptions) {
        var _this = this;
        this.requestOptions = requestOptions;
        var _a = __assign(__assign({}, DEFAULT_REQUEST_OPTIONS), this.getRequestOptions()), method = _a.method, path = _a.path, params = _a.params;
        api_2.default.call(method, path, {
            params: (0, api_1.objectToFormData)(__assign(__assign({}, params), { identification: api_2.default.getIdentification() })),
            onSuccess: function (response) {
                var analyticsData = _this.extractAnalyticsData(response);
                requestOptions.onSuccess(response, analyticsData);
                if (requestOptions.track) {
                    // Track analytics data if track is enabled
                    analyticsTracker_1.default.trackEvent(analyticsData.event_type, analyticsData.event_details);
                }
            },
            onFailure: function (response) {
                requestOptions.onFailure(response);
            }
        });
    };
    APIConnector.prototype.extractAnalyticsData = function (data) {
        return data;
    };
    APIConnector.prototype.getRequestOptions = function () {
        return DEFAULT_REQUEST_OPTIONS;
    };
    return APIConnector;
}());
exports.default = APIConnector;
//# sourceMappingURL=apiConnector.js.map