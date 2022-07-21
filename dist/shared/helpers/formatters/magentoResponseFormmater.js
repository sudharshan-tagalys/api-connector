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
var MagentoResponseFormmater = /** @class */ (function (_super) {
    __extends(MagentoResponseFormmater, _super);
    function MagentoResponseFormmater() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MagentoResponseFormmater.prototype.platformFieldTranslations = function () {
        return {
            __id: "id",
            name: "name",
            sku: "sku",
            image_url: "image_url",
            price: "price",
            sale_price: "special_price",
            link: "link",
            in_stock: "in_stock",
            introduced_at: "created_at",
            __magento_type: "type_id",
            __categories__ids: "category_ids"
        };
    };
    MagentoResponseFormmater.prototype.fieldsToIgnore = function () {
        return [''];
    };
    return MagentoResponseFormmater;
}(formatter_1.default));
exports.default = MagentoResponseFormmater;
//# sourceMappingURL=magentoResponseFormmater.js.map