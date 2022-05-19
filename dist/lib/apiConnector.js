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
var api_1 = require("../shared/helpers/api");
var formatFactory_1 = require("../shared/helpers/formatters/formatFactory");
var analyticsTracker_1 = require("./analyticsTracker");
var api_2 = require("./api");
var configuration_1 = require("./configuration");
var cookie_1 = require("./cookie");
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
    APIConnector.prototype.setResponseFormatter = function () {
        if (!this.responseFormatter) {
            this.responseFormatter = formatFactory_1.default.responseFormatter();
        }
    };
    APIConnector.prototype.call = function (requestOptions) {
        var _this = this;
        this.requestOptions = requestOptions;
        this.setResponseFormatter();
        var _a = __assign(__assign({}, DEFAULT_REQUEST_OPTIONS), this.getRequestOptions()), method = _a.method, path = _a.path, params = _a.params;
        api_2.default.call(method, path, {
            params: (0, api_1.objectToFormData)(__assign(__assign({}, params), { identification: configuration_1.default.getApiIdentification() })),
            onSuccess: function (response) {
                if (_this.isFailureResponse(response)) {
                    _this.requestOptions.onFailure(response);
                }
                else {
                    _this.onSuccessfulResponse(response);
                }
            },
            onFailure: function (response) {
                _this.requestOptions.onFailure(response);
            }
        });
    };
    APIConnector.prototype.onSuccessfulResponse = function (response) {
        var analyticsData = this.extractAnalyticsData(response);
        var formattedResponse = this.formatResponse(response);
        this.requestOptions.onSuccess(formattedResponse, analyticsData);
        if (configuration_1.default.canTrackAnalytics()) {
            analyticsTracker_1.default.trackEvent(analyticsData.event_type, analyticsData.event_details);
        }
        if (!configuration_1.default.analyticsStorageConsentProvided()) {
            cookie_1.default.batchDelete(Object.values(analyticsTracker_1.COOKIES));
        }
    };
    APIConnector.prototype.extractAnalyticsData = function (response) {
        return response;
    };
    APIConnector.prototype.formatResponse = function (response) {
        return response;
    };
    APIConnector.prototype.getRequestOptions = function () {
        return {};
    };
    APIConnector.prototype.isFailureResponse = function (response) {
        return false;
    };
    return APIConnector;
}());
exports.default = APIConnector;
//# sourceMappingURL=apiConnector.js.map