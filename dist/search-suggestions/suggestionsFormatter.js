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
var common_1 = require("../shared/helpers/common");
var SuggestionsFormatter = /** @class */ (function () {
    function SuggestionsFormatter(configuration) {
        this.configuration = configuration;
    }
    SuggestionsFormatter.prototype.format = function (response) {
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
                formattedQuery.queryString = (0, common_1.getEncodedQueryString)({
                    query: queryObj.query
                });
                return formattedQuery;
            }
            if (Array.isArray(queryObj.query)) {
                if (queryObj.hasOwnProperty('in')) {
                    var prefix = queryObj.query[0];
                    var suffix = queryObj.in.hierarchy.map(function (item) { return item.name; }).join(" ".concat(_this.configuration.hierachySeperator, " "));
                    var qf = __assign(__assign({}, queryObj.filter), (_a = {}, _a["".concat(queryObj.in.tag_set.id)] = queryObj.in.hierarchy.map(function (item) { return item.id; }), _a));
                    formattedQuery.displayString = "".concat(prefix, " ").concat(_this.configuration.hierachySeperator, " ").concat(suffix);
                    formattedQuery.queryString = (0, common_1.getEncodedQueryString)({
                        query: formattedQuery.displayString,
                        queryFilter: qf
                    });
                }
                else {
                    formattedQuery.displayString = queryObj.query.join(" ".concat(_this.configuration.categorySeperator, " "));
                    formattedQuery.queryString = (0, common_1.getEncodedQueryString)({
                        query: formattedQuery.displayString,
                        queryFilter: queryObj.filter
                    });
                }
            }
            return formattedQuery;
        });
    };
    return SuggestionsFormatter;
}());
exports.default = SuggestionsFormatter;
//# sourceMappingURL=suggestionsFormatter.js.map