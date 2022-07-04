"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce = function (func) {
    var timeout;
    return function executedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var debounceDuration = (args[1] || 500);
        console.log(debounceDuration);
        var later = function () {
            clearTimeout(timeout);
            func.apply(void 0, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, debounceDuration);
    };
};
exports.default = debounce;
//# sourceMappingURL=debounce.js.map