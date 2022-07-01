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
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnector_1 = require("../lib/apiConnector");
var localStorage_1 = require("../lib/localStorage");
var PopularSearches = /** @class */ (function (_super) {
    __extends(PopularSearches, _super);
    function PopularSearches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopularSearches.prototype.getRequestOptions = function () {
        return {
            path: "popular_searches"
        };
    };
    // rename to fetch
    // configuration to requestOptions
    PopularSearches.prototype.fetchPopularSearches = function (configuration) {
        var _this = this;
        // if popular searches exist in user's local storage, then merge it with recentSearches and return it
        return new Promise(function (resolve, reject) {
            var localPopularSearches = localStorage_1.default.getItem("tagalysPopularSearches") || { queries: [] };
            if (localPopularSearches.queries.length > 0) {
                resolve(localPopularSearches);
            }
            else {
                _this.call({
                    onSuccess: function (response) {
                        var popularSearchesFromResponse = _this.responseFormatter.popularSearches(response, configuration);
                        localStorage_1.default.setValue('tagalysPopularSearches', popularSearchesFromResponse, 3600000);
                        resolve(popularSearchesFromResponse);
                    },
                    onFailure: function (response) {
                        reject(response);
                    }
                });
            }
        });
    };
    PopularSearches.prototype.beforeAPICall = function (params) {
        console.log(params);
        return params;
    };
    PopularSearches.exporterName = function () {
        return 'PopularSearches';
    };
    return PopularSearches;
}(apiConnector_1.default));
exports.default = PopularSearches;
//# sourceMappingURL=index.js.map