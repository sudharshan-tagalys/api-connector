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
var tagalys_to_common_response_formatter_1 = require("./lib/tagalys-to-common-response-formatter");
var product_listing_page_1 = require("./product-listing-page");
var multi_market_1 = require("./lib/multi-market");
var shopifyApi_1 = require("./lib/shopifyApi");
exports.default = __assign(__assign(__assign({ apiClient: function () { return new shopifyApi_1.default(); } }, tagalys_to_common_response_formatter_1.default.export()), product_listing_page_1.default.export()), multi_market_1.default.export());
//# sourceMappingURL=index.js.map