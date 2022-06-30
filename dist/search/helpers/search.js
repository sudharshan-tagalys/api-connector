"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setQuery = function (query) {
    this.setRequestState(function (reqState) {
        reqState.query = query;
        return reqState;
    });
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getRequestHelpers = function () {
    var setQuery = this.searchHelpers.setQuery;
    return {
        setQuery: setQuery
    };
};
var getResponseHelpers = function () {
    return {};
};
exports.default = {
    setQuery: setQuery,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=search.js.map