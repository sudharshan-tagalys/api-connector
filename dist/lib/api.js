"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var API = /** @class */ (function () {
    function API() {
    }
    API.prototype.call = function (method, path, requestOptions, headers) {
        if (headers === void 0) { headers = { contentType: "application/x-www-form-urlencoded" }; }
        var xhr = new XMLHttpRequest();
        xhr.open(method, this.url(path));
        xhr.setRequestHeader('Content-Type', headers.contentType);
        xhr.onload = function () {
            if (xhr.status === 200) {
                requestOptions.onSuccess(JSON.parse(xhr.responseText));
            }
            else {
                // Handling API failure callback
                if (typeof (requestOptions.onFailure) != 'undefined') {
                    requestOptions.onFailure(JSON.parse(xhr.response));
                }
            }
        };
        xhr.onerror = function () {
            if (typeof (requestOptions.onFailure) != 'undefined') {
                requestOptions.onFailure(JSON.parse(xhr.response));
            }
        };
        xhr.send(requestOptions.params);
        return xhr;
    };
    API.prototype.url = function (path) {
        return "".concat(configuration_1.default.getServerUrl(), "/v1/").concat(path);
    };
    return API;
}());
exports.default = new API();
//# sourceMappingURL=api.js.map