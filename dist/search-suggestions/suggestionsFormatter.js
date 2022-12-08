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
        return response.queries.map(function (section) {
            var thisSection = __assign({}, section);
            var thisItems = thisSection.items;
            var formattedItems = thisItems.map(function (item) {
                if (item.hasOwnProperty("link")) {
                    return {
                        displayString: item.title,
                        link: item.link,
                        rawQuery: item
                    };
                }
                var displayString = item.query.join(" ".concat(_this.configuration.hierarchySeparator, " "));
                return {
                    displayString: displayString,
                    queryString: (0, common_1.getEncodedQueryString)({
                        query: displayString,
                        queryFilters: item.query_filters
                    }),
                    rawQuery: item
                };
            });
            return {
                section_title: thisSection.section_title,
                section_id: thisSection.section_id,
                items: formattedItems
            };
        });
    };
    return SuggestionsFormatter;
}());
exports.default = SuggestionsFormatter;
//# sourceMappingURL=suggestionsFormatter.js.map