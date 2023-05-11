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
var constants_1 = require("../shared/constants");
var api_1 = require("../shared/helpers/api");
var formatFactory_1 = require("../shared/helpers/formatters/formatFactory");
var shopifyMultiCurrencyPriceMutator_1 = require("../shared/helpers/mutators/shopifyMultiCurrencyPriceMutator");
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
            getProductPrices: common_1.getProductPrices,
            appendProductPricesFromStoreFrontAPI: common_1.appendProductPricesFromStoreFrontAPI
        };
    };
    APIConnector.prototype.internalSuccessCallback = function (response, formattedResponse) {
    };
    APIConnector.prototype.getFormattedResponse = function (response) {
        return this.formatResponse(response);
    };
    APIConnector.prototype.onSuccessfulResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var analyticsData, formattedResponse, mutatedResponse, helpers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        analyticsData = this.extractAnalyticsData(response);
                        formattedResponse = this.formatResponse(response);
                        return [4 /*yield*/, this.mutateResponse(formattedResponse)];
                    case 1:
                        mutatedResponse = _a.sent();
                        this.internalSuccessCallback(response, mutatedResponse);
                        helpers = this.getHelpersToExpose(response, mutatedResponse);
                        this.requestOptions.onSuccess(mutatedResponse, helpers);
                        if (analyticsData && configuration_1.default.canTrackAnalytics()) {
                            analyticsTracker_1.default.trackEvent(analyticsData.event_type, analyticsData.event_details);
                        }
                        if (!configuration_1.default.analyticsStorageConsentProvided()) {
                            cookie_1.default.batchDelete(Object.values(analyticsTracker_1.COOKIES));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    APIConnector.prototype.mutateResponse = function (formattedResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var shopifyMultiCurrencyPriceMutator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!configuration_1.default.isShopify()) return [3 /*break*/, 3];
                        shopifyMultiCurrencyPriceMutator = new shopifyMultiCurrencyPriceMutator_1.default();
                        if (!(configuration_1.default.isUsingMultiCountryCurrency() && !configuration_1.default.isUsingBaseCountryCode())) return [3 /*break*/, 3];
                        if (!configuration_1.default.waitForStoreFrontAPI()) return [3 /*break*/, 2];
                        return [4 /*yield*/, shopifyMultiCurrencyPriceMutator.mutate(formattedResponse)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        shopifyMultiCurrencyPriceMutator.resetProductPrices(formattedResponse);
                        _a.label = 3;
                    case 3: return [2 /*return*/, formattedResponse];
                }
            });
        });
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