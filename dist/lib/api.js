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
        return "".concat(this.configuration.apiServer, "/v1/").concat(path);
    };
    API.prototype.getIdentification = function () {
        return this.configuration.identification;
    };
    API.prototype.getCurrency = function () {
        return this.configuration.currency;
    };
    API.prototype.setConfiguration = function (configuration) {
        this.configuration = {
            identification: {
                client_code: configuration.credentials.clientCode,
                api_key: configuration.credentials.apiKey,
                store_id: configuration.storeId,
                // TODO: Confirm whether the API client should be dynamic
                api_client: {
                    vendor: "tagalys",
                    language: "js",
                    version: "3",
                    release: "1",
                },
            },
            apiServer: configuration.apiServer,
            currency: configuration.currency
        };
    };
    return API;
}());
exports.default = new API();
//# sourceMappingURL=api.js.map