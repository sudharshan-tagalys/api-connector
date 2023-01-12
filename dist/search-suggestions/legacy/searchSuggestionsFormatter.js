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
var common_1 = require("../../shared/helpers/common");
var suggestionsFormatter_1 = require("../suggestionsFormatter");
var LegacySearchSuggestionsFormatter = /** @class */ (function (_super) {
    __extends(LegacySearchSuggestionsFormatter, _super);
    function LegacySearchSuggestionsFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegacySearchSuggestionsFormatter.prototype.format = function (response) {
        var _this = this;
        if (!response.queries)
            return [];
        return response.queries.map(function (queryObj) {
            var _a;
            var formattedQuery = {
                displayString: "",
                queryString: "",
                rawQuery: queryObj
            };
            if (typeof queryObj.query === 'string') {
                formattedQuery.displayString = queryObj.query;
                formattedQuery.queryString = _this.getEncodedQueryString({
                    query: queryObj.query
                });
                return formattedQuery;
            }
            if (Array.isArray(queryObj.query)) {
                if (queryObj.hasOwnProperty('in')) {
                    var prefix = queryObj.query[0];
                    var suffix = queryObj.in.hierarchy.map(function (item) { return item.name; }).join(" ".concat(_this.configuration.hierarchySeparator, " "));
                    var qf = __assign(__assign({}, queryObj.filter), (_a = {}, _a["".concat(queryObj.in.tag_set.id)] = queryObj.in.hierarchy.map(function (item) { return item.id; }), _a));
                    formattedQuery.displayString = "".concat(prefix, " ").concat(_this.configuration.hierarchySeparator, " ").concat(suffix);
                    formattedQuery.queryString = _this.getEncodedQueryString({
                        query: formattedQuery.displayString,
                        queryFilters: qf
                    });
                }
                else {
                    formattedQuery.displayString = queryObj.query.join(" ".concat(_this.configuration.categorySeparator, " "));
                    formattedQuery.queryString = _this.getEncodedQueryString({
                        query: formattedQuery.displayString,
                        queryFilters: queryObj.filter
                    });
                }
            }
            return formattedQuery;
        });
    };
    LegacySearchSuggestionsFormatter.prototype.getEncodedQueryString = function (options) {
        return (0, common_1.getEncodedQueryString)(__assign(__assign({}, options), { legacySearchSuggestions: true }));
    };
    return LegacySearchSuggestionsFormatter;
}(suggestionsFormatter_1.default));
exports.default = LegacySearchSuggestionsFormatter;
//# sourceMappingURL=searchSuggestionsFormatter.js.map