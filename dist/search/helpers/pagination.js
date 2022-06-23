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
var goToPrevPage = function () {
    if (!this.paginationHelpers.hasPreviousPage()) {
        console.error("Min pages reached");
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.page -= 1;
        return reqState;
    });
};
var goToPage = function (page) {
    this.setRequestState(function (reqState) {
        reqState.page = page;
        return reqState;
    });
};
var getRequestHelpers = function () {
    var _a = this.paginationHelpers, goToNextPage = _a.goToNextPage, goToPrevPage = _a.goToPrevPage, goToPage = _a.goToPage;
    return {
        goToNextPage: goToNextPage,
        goToPrevPage: goToPrevPage,
        goToPage: goToPage
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
    goToPrevPage: goToPrevPage,
    getCurrentPage: getCurrentPage,
    getTotalPages: getTotalPages,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    goToPage: goToPage,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=pagination.js.map