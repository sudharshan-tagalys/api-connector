"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var Connector = /** @class */ (function () {
    function Connector() {
    }
    Connector.prototype.call = function (requestOptions) {
        this.requestOptions = requestOptions;
        api_1.default.call(this.method(), this.url(), requestOptions, this.extractAnalyticsData);
    };
    Connector.prototype.extractAnalyticsData = function (data) {
        return data;
    };
    Connector.prototype.method = function () {
        return "post";
    };
    Connector.prototype.url = function () {
        return "http://172.17.0.1:3003/v1".concat(this.path());
    };
    Connector.prototype.path = function () {
        return "";
    };
    return Connector;
}());
exports.default = Connector;
//# sourceMappingURL=connector.js.map