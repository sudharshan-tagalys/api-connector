"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getItem = function (key) {
        var item = window.localStorage.getItem(this.getNamespacedKey(key));
        var parsedItem = item ? JSON.parse(item) : null;
        if (parsedItem) {
            if (parsedItem.hasOwnProperty("expiry") && this.getCurrentTime() >= parsedItem.expiry) {
                this.removeItem(key);
                return null;
            }
            return parsedItem.value;
        }
        return null;
    };
    LocalStorage.prototype.removeItem = function (key) {
        window.localStorage.removeItem(this.getNamespacedKey(key));
    };
    // accept 1-h/1-ms instead of raw ttl
    LocalStorage.prototype.setValue = function (key, value, ttl) {
        var valueToStore = {
            value: value,
        };
        if (ttl) {
            valueToStore.expiry = this.getCurrentTime() + ttl;
        }
        return window.localStorage.setItem(this.getNamespacedKey(key), JSON.stringify(valueToStore));
    };
    LocalStorage.prototype.getCurrentTime = function () {
        return new Date().getTime();
    };
    LocalStorage.prototype.getNamespacedKey = function (key) {
        return "".concat(key, ":").concat(configuration_1.default.getStoreId());
    };
    return LocalStorage;
}());
exports.default = new LocalStorage();
//# sourceMappingURL=localStorage.js.map