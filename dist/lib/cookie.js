"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomId = function (length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};
var Cookie = /** @class */ (function () {
    function Cookie() {
    }
    Cookie.prototype.isEnabled = function () {
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = document.cookie.indexOf("testcookie") != -1;
        }
        return cookieEnabled;
    };
    Cookie.prototype.batchUpdate = function (cookies) {
        var _this = this;
        cookies.forEach(function (cookie) { return _this.update(cookie); });
    };
    Cookie.prototype.update = function (_a) {
        var name = _a.name, _b = _a.value, value = _b === void 0 ? "" : _b, expiryTime = _a.expiryTime;
        var cookieValue = this.get(value);
        if (cookieValue === "") {
            cookieValue = randomId(32);
        }
        this.set(name, cookieValue, expiryTime);
    };
    Cookie.prototype.get = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0) {
                var cvalue = c.substring(name.length, c.length);
                cvalue = cvalue.replace(/%3B/g, ';');
                return cvalue;
            }
        }
        return "";
    };
    Cookie.prototype.set = function (cname, cvalue, expiryTime) {
        var d = new Date();
        d.setTime(d.getTime() + expiryTime);
        var expires = "expires=" + d.toUTCString();
        cvalue = cvalue.replace(/;/g, '%3B');
        if (window.location.hostname.indexOf('.') === -1) {
            document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/; " + "domain=" + window.location.hostname;
        }
        else {
            document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/; " + "domain=." + window.location.hostname;
        }
    };
    Cookie.prototype.delete = function (name) {
        this.set(name, "", -1);
    };
    Cookie.prototype.batchDelete = function (cookies) {
        var _this = this;
        cookies.forEach(function (cookie) { return _this.delete(cookie); });
    };
    return Cookie;
}());
exports.default = new Cookie();
//# sourceMappingURL=cookie.js.map