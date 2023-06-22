"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCurrentPage = function () {
    return this.responseState.page;
};
var getTotalPages = function () {
    return this.responseState.total_pages;
};
var hasNextPage = function () {
    var helpers = this.paginationHelpers;
    var totalPages = helpers.getTotalPages();
    var nextPage = helpers.getCurrentPage() + 1;
    if (typeof totalPages === 'number')
        return (nextPage <= totalPages);
    return true;
};
var hasPreviousPage = function () {
    var helpers = this.paginationHelpers;
    var previousPage = helpers.getCurrentPage() - 1;
    return (previousPage > 0);
};
var goToNextPage = function () {
    if (!this.paginationHelpers.hasNextPage()) {
        console.error('Max pages reached');
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.page += 1;
        return reqState;
    });
};
var loadPreviousPage = function () {
    goToPreviousPage("load_previous_page");
};
var goToPreviousPage = function (action) {
    if (action === void 0) { action = "go_to_previous_page"; }
    if (!this.paginationHelpers.hasPreviousPage()) {
        console.error("Min pages reached");
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.page -= 1;
        reqState.action = action;
        return reqState;
    });
};
var goToPage = function (page) {
    this.setRequestState(function (reqState) {
        reqState.page = page;
        return reqState;
    });
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getRequestHelpers = function () {
    var _a = this.paginationHelpers, goToNextPage = _a.goToNextPage, goToPreviousPage = _a.goToPreviousPage, goToPage = _a.goToPage, loadPreviousPage = _a.loadPreviousPage;
    return {
        goToNextPage: goToNextPage,
        goToPreviousPage: goToPreviousPage,
        goToPage: goToPage,
        loadPreviousPage: loadPreviousPage
    };
};
var getResponseHelpers = function () {
    var _a = this.paginationHelpers, getCurrentPage = _a.getCurrentPage, getTotalPages = _a.getTotalPages, hasNextPage = _a.hasNextPage, hasPreviousPage = _a.hasPreviousPage;
    return {
        getCurrentPage: getCurrentPage,
        getTotalPages: getTotalPages,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage
    };
};
exports.default = {
    goToNextPage: goToNextPage,
    goToPreviousPage: goToPreviousPage,
    getCurrentPage: getCurrentPage,
    getTotalPages: getTotalPages,
    loadPreviousPage: loadPreviousPage,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    goToPage: goToPage,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=pagination.js.map