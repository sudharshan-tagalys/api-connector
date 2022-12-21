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
var formatter_1 = require("./formatter");
var BigCommerceResponseFormatter = /** @class */ (function (_super) {
    __extends(BigCommerceResponseFormatter, _super);
    function BigCommerceResponseFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigCommerceResponseFormatter.prototype.platformFieldTranslations = function () {
        return {
            __id: function (data) {
                return {
                    key: 'id',
                    value: parseInt(data.__id)
                };
            },
            name: 'name',
            introduced_at: 'date_created',
            images: "images",
            price: "price",
            sale_price: "sale_price",
        };
    };
    return BigCommerceResponseFormatter;
}(formatter_1.default));
exports.default = BigCommerceResponseFormatter;
//# sourceMappingURL=bigCommerceResponseFormatter.js.map