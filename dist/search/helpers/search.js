"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setQuery = function (query) {
    this.setRequestState(function (reqState) {
        reqState.query = query;
        return reqState;
    });
};
var isValidQuery = function () {
    return (!this.searchHelpers.isPartialResults() && !this.searchHelpers.isRedirected());
};
var isSpellingCorrectedQuery = function () {
    return this.responseState.hasOwnProperty("query_original");
};
var getQuery = function () {
    if (this.searchHelpers.isRedirected()) {
        return false;
    }
    return this.responseState.query;
};
var getOriginalQuery = function () {
    return this.responseState.hasOwnProperty("query_original") ? this.responseState.query_original : false;
};
var isPartialResults = function () {
    return this.responseState.query_mode === "or";
};
var isRedirected = function () {
    return this.responseState.hasOwnProperty("redirect_to_url");
};
var getRedirectURL = function () {
    if (this.responseState.hasOwnProperty("redirect_to_url")) {
        return this.responseState.redirect_to_url;
    }
    return false;
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getRequestHelpers = function () {
    var setQuery = this.searchHelpers.setQuery;
    return {
        setQuery: setQuery
    };
};
var getResponseHelpers = function () {
    var _a = this.searchHelpers, isValidQuery = _a.isValidQuery, isSpellingCorrectedQuery = _a.isSpellingCorrectedQuery, getQuery = _a.getQuery, getOriginalQuery = _a.getOriginalQuery, isPartialResults = _a.isPartialResults, isRedirected = _a.isRedirected, getRedirectURL = _a.getRedirectURL;
    return {
        isValidQuery: isValidQuery,
        isSpellingCorrectedQuery: isSpellingCorrectedQuery,
        getQuery: getQuery,
        getOriginalQuery: getOriginalQuery,
        isPartialResults: isPartialResults,
        isRedirected: isRedirected,
        getRedirectURL: getRedirectURL
    };
};
exports.default = {
    setQuery: setQuery,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers,
    isValidQuery: isValidQuery,
    isSpellingCorrectedQuery: isSpellingCorrectedQuery,
    getQuery: getQuery,
    getOriginalQuery: getOriginalQuery,
    isPartialResults: isPartialResults,
    isRedirected: isRedirected,
    getRedirectURL: getRedirectURL
};
//# sourceMappingURL=search.js.map