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
var withDefaultRequestOptions = function (requestOptions) {
    return __assign(__assign({}, constants_1.DEFAULT_REQUEST_OPTIONS), requestOptions);
};
exports.APIConnector = {
    SimilarProducts: {
        call: function (requestOptions) { return similarProductsWidget_1.default.call(withDefaultRequestOptions(requestOptions)); },
    },
    SmartWidget: {
        call: function (requestOptions) { return smartWidget_1.default.call(withDefaultRequestOptions(requestOptions)); },
    },
    setConfiguration: function (config) { return configuration_1.default.setConfiguration(__assign(__assign({}, constants_1.DEFAULT_CONFIGURATION), config)); },
};
window.addEventListener("load", function () {
    var event = new Event("tagalys:ready");
    document.dispatchEvent(event);
});
//# sourceMappingURL=index.js.map