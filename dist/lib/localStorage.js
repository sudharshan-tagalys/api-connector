"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getItem = function (key) {
        var item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : "";
    };
    LocalStorage.prototype.setValue = function (key, value) {
        return window.localStorage.setItem(key, JSON.stringify(value));
    };
    return LocalStorage;
}());
exports.default = new LocalStorage();
//# sourceMappingURL=localStorage.js.map