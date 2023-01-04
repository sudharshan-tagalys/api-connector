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
var constants_1 = require("../shared/constants");
var api_1 = require("../shared/helpers/api");
var formatFactory_1 = require("../shared/helpers/formatters/formatFactory");
var analyticsTracker_1 = require("./analyticsTracker");
var api_2 = require("./api");
var configuration_1 = require("./configuration");
var cookie_1 = require("./cookie");
var common_1 = require("../shared/helpers/common");
var DEFAULT_REQUEST_OPTIONS = {
    method: "POST",
    path: "",
    format: constants_1.REQUEST_FORMAT.FORM_DATA,
    headers: {
        contentType: "application/x-www-form-urlencoded"
    },
    params: {}
};
var APIConnector = /** @class */ (function () {
    function APIConnector() {
        this.currentRequestNumber = 0;
        this.completedRequestNumber = 0;
    }
    APIConnector.prototype.setResponseFormatter = function () {
        if (!this.responseFormatter) {
            this.responseFormatter = formatFactory_1.default.responseFormatter();
        }
    };
    APIConnector.prototype.call = function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = this.requestOptions; }
        var currentRequest = this.currentRequestNumber += 1;
        this.updateRequestNumber(currentRequest);
        this.requestOptions = requestOptions;
        this.setResponseFormatter();
        var _a = __assign(__assign({}, DEFAULT_REQUEST_OPTIONS), this.getRequestOptions()), method = _a.method, path = _a.path, params = _a.params, format = _a.format;
        params = this.beforeAPICall(params);
        api_2.default.call(method, path, {
            params: this.formatRequestParams(__assign(__assign({}, params), { identification: configuration_1.default.getApiIdentification() }), format),
            onSuccess: function (response) {
                if (_this.oldRequest(currentRequest)) {
                    return;
                }
                _this.markRequestComplete(currentRequest);
                if (_this.isFailureResponse(response)) {
                    _this.requestOptions.onFailure(response, _this.getHelpersToExpose(false, false));
                }
                else {
                    _this.onSuccessfulResponse(response);
                }
            },
            onFailure: function (response) {
                console.log("falied");
                if (_this.oldRequest(currentRequest)) {
                    return;
                }
                _this.markRequestComplete(currentRequest);
                _this.requestOptions.onFailure(response, _this.getHelpersToExpose(false, false));
            }
        });
    };
    APIConnector.prototype.formatRequestParams = function (params, format) {
        if (format === constants_1.REQUEST_FORMAT.FORM_DATA) {
            return (0, api_1.objectToFormData)(params);
        }
        if (format === constants_1.REQUEST_FORMAT.JSON) {
            return JSON.stringify(params);
        }
        return params;
    };
    APIConnector.prototype.getHelpersToExpose = function (response, formattedResponse) {
        return {
            getProductPrices: common_1.getProductPrices
        };
    };
    APIConnector.prototype.internalSuccessCallback = function (response, formattedResponse) {
    };
    APIConnector.prototype.getFormattedResponse = function (response) {
        return this.formatResponse(response);
    };
    APIConnector.prototype.onSuccessfulResponse = function (response) {
        var analyticsData = this.extractAnalyticsData(response);
        var formattedResponse = this.formatResponse(response);
        this.internalSuccessCallback(response, formattedResponse);
        var helpers = this.getHelpersToExpose(response, formattedResponse);
        this.requestOptions.onSuccess(formattedResponse, helpers);
        if (analyticsData && configuration_1.default.canTrackAnalytics()) {
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
    APIConnector.prototype.beforeAPICall = function (params) {
        return this.requestOptions.beforeAPICall(params);
    };
    APIConnector.defaultRequestOptions = function () {
        return __assign({}, constants_1.DEFAULT_REQUEST_CALLBACKS);
    };
    APIConnector.prototype.new = function (requestOptions) {
        return undefined;
    };
    APIConnector.exporterName = function () {
        throw new Error("Should specify exporter name");
    };
    APIConnector.prototype.updateRequestNumber = function (requestNumber) {
        this.currentRequestNumber = requestNumber;
        return requestNumber;
    };
    APIConnector.prototype.markRequestComplete = function (requestNumber) {
        this.completedRequestNumber = requestNumber;
        return requestNumber;
    };
    APIConnector.prototype.oldRequest = function (requestNumber) {
        return (requestNumber < this.completedRequestNumber);
    };
    APIConnector.export = function () {
        var _a;
        var _this = this;
        var exporterKey = this.exporterName();
        return _a = {},
            _a[exporterKey] = {
                call: function (requestOptions, defaultRequestOptions) {
                    if (defaultRequestOptions === void 0) { defaultRequestOptions = _this.defaultRequestOptions(); }
                    var instance = new _this();
                    return instance.call(__assign(__assign({}, defaultRequestOptions), requestOptions));
                },
                new: function (requestOptions, defaultRequestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (defaultRequestOptions === void 0) { defaultRequestOptions = _this.defaultRequestOptions(); }
                    var instance = new _this();
                    var helpers = instance.new(__assign(__assign({}, defaultRequestOptions), requestOptions));
                    return {
                        helpers: __assign(__assign({}, helpers), { call: function () { return instance.call(instance.requestOptions); } })
                    };
                }
            },
            _a;
    };
    return APIConnector;
}());
exports.default = APIConnector;
//# sourceMappingURL=apiConnector.js.map