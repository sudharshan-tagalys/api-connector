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
    PopularSearches.prototype.exporterName = function () {
        return 'PopularSearches';
    };
    return PopularSearches;
}(apiConnector_1.default));
exports.default = new PopularSearches();
//# sourceMappingURL=index.js.map