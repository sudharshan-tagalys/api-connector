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
exports.APIConnector = void 0;
var configuration_1 = require("./lib/configuration");
var constants_1 = require("./shared/constants");
var similarProductsWidget_1 = require("./similarProductsWidget");
var smartWidget_1 = require("./smartWidget");
var searchSuggestions_1 = require("./searchSuggestions");
var withDefaultRequestOptions = function (requestOptions, defaultRequestOptions) {
    if (defaultRequestOptions === void 0) { defaultRequestOptions = constants_1.DEFAULT_REQUEST_OPTIONS; }
    return __assign(__assign({}, defaultRequestOptions), requestOptions);
};
exports.APIConnector = __assign(__assign(__assign(__assign({}, similarProductsWidget_1.default.export()), smartWidget_1.default.export()), searchSuggestions_1.default.export()), { setConfiguration: function (config) { return configuration_1.default.setConfiguration(__assign(__assign({}, constants_1.DEFAULT_CONFIGURATION), config)); } });
window.addEventListener("load", function () {
    var event = new Event("tagalys:ready");
    document.dispatchEvent(event);
});
//# sourceMappingURL=index.js.map