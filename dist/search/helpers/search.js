"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setQuery = function (query) {
    this.setRequestState(function (reqState) {
        reqState.query = query;
        return reqState;
    });
};
var setQueryMode = function (queryMode) {
    this.setRequestState(function (reqState) {
        reqState.queryMode = queryMode;
        return reqState;
    });
};
var getRequestHelpers = function () {
    var _a = this.searchHelpers, setQuery = _a.setQuery, setQueryMode = _a.setQueryMode;
    return {
        setQuery: setQuery,
        setQueryMode: setQueryMode
    };
};
var getResponseHelpers = function () {
    return {};
};
exports.default = {
    setQuery: setQuery,
    setQueryMode: setQueryMode,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=search.js.map