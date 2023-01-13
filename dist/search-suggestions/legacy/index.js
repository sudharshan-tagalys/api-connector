"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var constants_1 = require("../../shared/constants");
var __1 = require("..");
var LegacySearchSuggestions = /** @class */ (function (_super) {
    __extends(LegacySearchSuggestions, _super);
    function LegacySearchSuggestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegacySearchSuggestions.prototype.getRequestOptions = function () {
        return {
            path: "ss",
            format: constants_1.REQUEST_FORMAT.JSON,
            params: __assign(__assign({ q: this.requestOptions.params.query }, LegacySearchSuggestions.defaultRequestOptions().params.request), { products: this.requestOptions.params.request.products, queries: this.requestOptions.params.request.queries }),
        };
    };
    LegacySearchSuggestions.exporterName = function () {
        return "LegacySearchSuggestions";
    };
    LegacySearchSuggestions.prototype.formatResponse = function (response) {
        return this.responseFormatter.legacySearchSuggestions(response, this.requestOptions.configuration);
    };
    LegacySearchSuggestions.defaultRequestOptions = function () {
        return __assign(__assign({}, constants_1.DEFAULT_REQUEST_CALLBACKS), { params: {
                request: {
                    products: 10,
                    queries: 10,
                },
            }, configuration: {
                categorySeparator: "▸",
                hierarchySeparator: "➜",
            } });
    };
    return LegacySearchSuggestions;
}(__1.default));
exports.default = LegacySearchSuggestions;
//# sourceMappingURL=index.js.map