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
var SuggestionsFormatter = /** @class */ (function () {
    function SuggestionsFormatter() {
    }
    SuggestionsFormatter.prototype.getQueryString = function (q, qf) {
        if (qf === void 0) { qf = {}; }
        var _a = this.configuration.queryString, query = _a.query, queryFilter = _a.queryFilter;
        var baseQueryString = "?".concat(query, "=");
        if (typeof (qf) == 'undefined' || Object.keys(qf).length === 0) {
            return (baseQueryString + encodeURIComponent(q));
        }
        else {
            var str = Object.keys(qf).map(function (key) {
                return "".concat(encodeURIComponent(key), "-").concat(encodeURIComponent(qf[key]));
            }).join('~');
            var qf_param = "".concat(encodeURIComponent(queryFilter), "=").concat(str);
            return baseQueryString.concat(encodeURIComponent(q) + "&" + qf_param);
        }
    };
    SuggestionsFormatter.prototype.format = function (response, configuration) {
        var _this = this;
        this.configuration = configuration;
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
                formattedQuery.queryString = _this.getQueryString(queryObj.query);
                return formattedQuery;
            }
            console.log(configuration);
            if (Array.isArray(queryObj.query)) {
                if (queryObj.hasOwnProperty('in')) {
                    var prefix = queryObj.query[0];
                    var suffix = queryObj.in.hierarchy.map(function (item) { return item.name; }).join(" ".concat(configuration.hierachySeperator, " "));
                    var qf = __assign(__assign({}, queryObj.filter), (_a = {}, _a["".concat(queryObj.in.tag_set.id)] = queryObj.in.hierarchy.map(function (item) { return item.id; }), _a));
                    formattedQuery.displayString = "".concat(prefix, " ").concat(configuration.hierachySeperator, " ").concat(suffix);
                    formattedQuery.queryString = _this.getQueryString(formattedQuery.displayString, qf);
                }
                else {
                    formattedQuery.displayString = queryObj.query.join(" ".concat(configuration.categorySeperator, " "));
                    formattedQuery.queryString = _this.getQueryString(formattedQuery.displayString, queryObj.filter);
                }
            }
            return formattedQuery;
        });
    };
    return SuggestionsFormatter;
}());
exports.default = new SuggestionsFormatter();
//# sourceMappingURL=suggestionsFormatter.js.map