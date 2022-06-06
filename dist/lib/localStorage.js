"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getItem = function (key) {
        var item = window.localStorage.getItem(key);
        var parsedItem = item ? JSON.parse(item) : "";
        if (parsedItem) {
            if (parsedItem.hasOwnProperty("expiry") && parsedItem.expiry <= this.getCurrentTime()) {
                this.removeItem(key);
                return null;
            }
            return parsedItem.value;
        }
        return "";
    };
    LocalStorage.prototype.removeItem = function (key) {
        window.localStorage.removeItem(key);
    };
    LocalStorage.prototype.setValue = function (key, value, ttl) {
        var valueToStore = {
            value: value,
        };
        console.log(ttl);
        if (ttl) {
            var now = new Date();
            valueToStore.expiry = now.getTime() + ttl;
        }
        return window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };
    LocalStorage.prototype.getCurrentTime = function () {
        return new Date().getTime();
    };
    return LocalStorage;
}());
exports.default = new LocalStorage();
//# sourceMappingURL=localStorage.js.map