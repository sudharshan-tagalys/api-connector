import configuration from "./configuration";
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
    };
    API.prototype.url = function (path) {
        return "".concat(configuration.getApiServer(), "/v1/").concat(path);
    };
    return API;
}());
export default new API();
