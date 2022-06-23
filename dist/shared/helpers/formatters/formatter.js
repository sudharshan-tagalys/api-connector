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
var suggestionsFormatter_1 = require("../../../search-suggestions/suggestionsFormatter");
var Formatter = /** @class */ (function () {
    function Formatter() {
        var _this = this;
        this.formatDetail = function (detail) {
            var __tagalys_fields = {};
            var platform_fields = {};
            for (var _i = 0, _a = Object.entries(detail); _i < _a.length; _i++) {
                var _b = _a[_i], fieldName = _b[0], fieldValue = _b[1];
                if (!_this.isIgnoredField(fieldName)) {
                    if (_this.isPlatformField(fieldName)) {
                        var _c = _this.translatePlatformField(fieldName, detail), key = _c.key, value = _c.value;
                        platform_fields[key] = value;
                    }
                    else {
                        __tagalys_fields[fieldName] = fieldValue;
                    }
                }
            }
            return __assign(__assign(__assign({}, platform_fields), _this.additionalPlatformFields(detail)), { __tagalys_fields: __tagalys_fields });
        };
    }
    Formatter.prototype.formatDetails = function (details) {
        return details.map(this.formatDetail);
    };
    Formatter.prototype.platformFieldTranslations = function () {
        return {};
    };
    Formatter.prototype.additionalPlatformFields = function (detail) {
        return {};
    };
    Formatter.prototype.fieldsToIgnore = function () {
        return [];
    };
    Formatter.prototype.isPlatformField = function (fieldName) {
        var platformFieldTranslations = this.platformFieldTranslations();
        return platformFieldTranslations.hasOwnProperty(fieldName);
    };
    Formatter.prototype.isIgnoredField = function (fieldName) {
        var fieldsToIgnore = this.fieldsToIgnore();
        return fieldsToIgnore.includes(fieldName);
    };
    Formatter.prototype.translatePlatformField = function (fieldName, detail) {
        var platformFieldTranslations = this.platformFieldTranslations();
        if (typeof platformFieldTranslations[fieldName] === 'function') {
            var formatter = platformFieldTranslations[fieldName];
            return formatter(detail);
        }
        return {
            key: platformFieldTranslations[fieldName],
            value: detail[fieldName]
        };
    };
    Formatter.prototype.similarProducts = function (response) {
        return {
            products: this.formatDetails(response.details)
        };
    };
    Formatter.prototype.boughtAlsoBought = function (response) {
        return {
            products: this.formatDetails(response.details)
        };
    };
    Formatter.prototype.viewedAlsoViewed = function (response) {
        return {
            products: this.formatDetails(response.details)
        };
    };
    Formatter.prototype.addedToCartAlsoAddedToCart = function (response) {
        return {
            products: this.formatDetails(response.details)
        };
    };
    Formatter.prototype.smartWidgets = function (response) {
        return {
            name: response.name,
            widget_name: response.widget_name,
            products: this.formatDetails(response.details)
        };
    };
    Formatter.prototype.searchSuggestions = function (response, configuration) {
        var suggestionsFormatter = new suggestionsFormatter_1.default(configuration);
        return {
            queries: suggestionsFormatter.format(response),
            products: this.formatDetails(response.products)
        };
    };
    Formatter.prototype.search = function (response) {
        var formattedResponse = {};
        if (response.details) {
            formattedResponse["products"] = this.formatDetails(response.details);
        }
        var totalPages = Math.ceil(response.total / response.per_page);
        formattedResponse["total_pages"] = totalPages;
        formattedResponse["page"] = response.page;
        formattedResponse['total'] = response.total;
        if (response.filters) {
            formattedResponse['filters'] = response.filters;
        }
        if (response.sort_options) {
            var sortOptions_1 = [];
            response.sort_options.forEach(function (sortOption) {
                if (sortOption.hasOwnProperty("directions")) {
                    sortOption.directions.forEach(function (sortDirection) {
                        sortOptions_1.push({
                            id: "".concat(sortOption.id, "-").concat(sortDirection.direction),
                            label: sortDirection.label,
                            selected: sortDirection.selected
                        });
                    });
                }
                else {
                    sortOptions_1.push(sortOption);
                }
            });
            formattedResponse["sort_options"] = sortOptions_1;
        }
        return formattedResponse;
    };
    Formatter.prototype.popularSearches = function (response, configuration) {
        var suggestionsFormatter = new suggestionsFormatter_1.default(configuration);
        return {
            queries: suggestionsFormatter.format({ queries: response.popular_searches }),
        };
    };
    return Formatter;
}());
exports.default = Formatter;
//# sourceMappingURL=formatter.js.map