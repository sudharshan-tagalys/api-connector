"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = exports.randomId = void 0;
var randomId = function (length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};
exports.randomId = randomId;
exports.AppContext = window;
//# sourceMappingURL=common.js.map