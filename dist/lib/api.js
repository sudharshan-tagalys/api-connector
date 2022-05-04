"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        };
        xhr.onerror = function () {
            if (typeof (requestOptions.failure) != 'undefined') {
                requestOptions.onFailure(xhr);
            }
        };
        xhr.send(requestOptions.params);
    };
    API.prototype.url = function (path) {
        return "https://stage2-api.tagalys.com/v1/".concat(path);
        // return `https://api-${this.dataCenter}.tagalys.com/v1/${path}`;
    };
    API.prototype.getIdentification = function () {
        return this.identification;
    };
    API.prototype.setConfiguration = function (configuration) {
        this.identification = {
            client_code: configuration.credentials.client_code,
            api_key: configuration.credentials.api_key,
            store_id: configuration.store_id,
            // TODO: Confirm whether the API client should be dynamic
            api_client: {
                vendor: "tagalys",
                language: "js",
                version: "3",
                release: "1",
            }
        };
        this.dataCenter = configuration.dataCenter;
    };
    return API;
}());
exports.default = new API();
//# sourceMappingURL=api.js.map