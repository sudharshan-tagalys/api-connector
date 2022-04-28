"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../utils/api");
var API = /** @class */ (function () {
    function API() {
    }
    API.prototype.call = function (method, url, requestOptions, analyticsDataFormatter) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                requestOptions.onSuccess(response, analyticsDataFormatter(response));
            }
        };
        xhr.onerror = function () {
            if (typeof (requestOptions.failure) != 'undefined') {
                requestOptions.onFailure(xhr);
            }
        };
        xhr.send((0, api_1.objectToFormData)(__assign(__assign({}, requestOptions.params), { identification: this.identification })));
    };
    // TODO: Perform validation of identification
    API.prototype.isInValidIdentification = function (identification) {
        return false;
    };
    API.prototype.setApiIdentification = function (identification) {
        this.identification = {
            client_code: identification.credentials.client_code,
            api_key: identification.credentials.api_key,
            store_id: identification.store_id,
            // TODO: Confirm whether the API client should be dynamic
            api_client: {
                vendor: "tagalys",
                language: "js",
                version: "3",
                release: "1",
            }
        };
    };
    return API;
}());
exports.default = new API();
//# sourceMappingURL=api.js.map