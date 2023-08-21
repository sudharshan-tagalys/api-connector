"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("../configuration");
var localStorage_1 = require("../localStorage");
var TAGALYS_API_STATUS = "TAGALYS_API_STATUS";
var TagalysAPI = /** @class */ (function () {
    function TagalysAPI() {
    }
    TagalysAPI.prototype.call = function (method, path, requestOptions, headers) {
        if (headers === void 0) { headers = { contentType: "application/x-www-form-urlencoded" }; }
        return __awaiter(this, void 0, void 0, function () {
            var response, parsedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.url(path), {
                            body: requestOptions.params,
                            headers: {
                                "Content-Type": headers.contentType,
                            },
                            method: method,
                        })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        parsedResponse = _a.sent();
                        if (requestOptions.hasOwnProperty("onSuccess")) {
                            return [2 /*return*/, requestOptions.onSuccess(parsedResponse)];
                        }
                        return [2 /*return*/, parsedResponse];
                    case 3:
                        this.setAsOffline();
                        if (typeof (requestOptions.onFailure) != 'undefined') {
                            return [2 /*return*/, requestOptions.onFailure(response)];
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TagalysAPI.prototype.url = function (path) {
        return "".concat(configuration_1.default.getServerUrl(), "/v1/").concat(path);
    };
    TagalysAPI.prototype.isOnline = function () {
        return !localStorage_1.default.getItem(TAGALYS_API_STATUS);
    };
    TagalysAPI.isOffline = function () {
        return (localStorage_1.default.getItem(TAGALYS_API_STATUS) === "offline");
    };
    TagalysAPI.prototype.setAsOffline = function () {
        var AN_HOUR = 3600000;
        localStorage_1.default.setValue(TAGALYS_API_STATUS, "offline", AN_HOUR);
    };
    TagalysAPI.prototype.setAsOnline = function () {
        localStorage_1.default.removeItem(TAGALYS_API_STATUS);
    };
    TagalysAPI.prototype.isAPIHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.url("api_health"), {
                            body: null,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "GET",
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return TagalysAPI;
}());
exports.default = TagalysAPI;
//# sourceMappingURL=tagalysApi.js.map