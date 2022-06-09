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
var widget_1 = require("../lib/widget");
var ViewedAlsoViewed = /** @class */ (function (_super) {
    __extends(ViewedAlsoViewed, _super);
    function ViewedAlsoViewed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewedAlsoViewed.exporterName = function () {
        return 'ViewedAlsoViewed';
    };
    ViewedAlsoViewed.prototype.path = function () {
        return "products/".concat(this.requestOptions.params.productId, "/viewed_also_viewed");
    };
    ViewedAlsoViewed.prototype.plType = function () {
        return "widget-viewed_also_viewed";
    };
    ViewedAlsoViewed.prototype.formatResponse = function (response) {
        return this.responseFormatter.viewedAlsoViewed(response);
    };
    return ViewedAlsoViewed;
}(widget_1.default));
exports.default = ViewedAlsoViewed;
//# sourceMappingURL=index.js.map