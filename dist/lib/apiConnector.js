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
import { objectToFormData } from "../shared/helpers/api";
import AnalyticsTracker, { COOKIES } from "./analyticsTracker";
import api from "./api";
import configuration from "./configuration";
import cookie from "./cookie";
var DEFAULT_REQUEST_OPTIONS = {
    method: "POST",
    path: "",
    headers: {
        contentType: "application/x-www-form-urlencoded"
    },
    params: {}
};
var APIConnector = /** @class */ (function () {
    function APIConnector() {
    }
    APIConnector.prototype.call = function (requestOptions) {
        var _this = this;
        this.requestOptions = requestOptions;
        var _a = __assign(__assign({}, DEFAULT_REQUEST_OPTIONS), this.getRequestOptions()), method = _a.method, path = _a.path, params = _a.params;
        api.call(method, path, {
            params: objectToFormData(__assign(__assign({}, params), { identification: configuration.getApiIdentification() })),
            onSuccess: function (response) {
                var analyticsData = _this.extractAnalyticsData(response);
                requestOptions.onSuccess(response, analyticsData);
                if (configuration.canTrackAnalytics()) {
                    if (response.status === "OK") {
                        // Track analytics data if track is enabled
                        AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
                    }
                }
                else {
                    cookie.batchDelete(Object.values(COOKIES));
                }
            },
            onFailure: function (response) {
                requestOptions.onFailure(response);
            }
        });
    };
    APIConnector.prototype.extractAnalyticsData = function (response) {
        return response;
    };
    APIConnector.prototype.getRequestOptions = function () {
        return DEFAULT_REQUEST_OPTIONS;
    };
    return APIConnector;
}());
export default APIConnector;
