"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = void 0;
var filter_1 = require("./filter");
var sortOption_1 = require("./sortOption");
exports.ACTIONS = {
    GO_TO_NEXT_PAGE: 'GO_TO_NEXT_PAGE',
    GO_TO_PREVIOUS_PAGE: 'GO_TO_PREVIOUS_PAGE',
    GO_TO_PAGE: 'GO_TO_PAGE'
};
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
        reqState.action = exports.ACTIONS.GO_TO_NEXT_PAGE;
        return reqState;
    });
};
var goToPreviousPage = function () {
    if (!this.paginationHelpers.hasPreviousPage()) {
        console.error("Min pages reached");
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.page -= 1;
        reqState.action = exports.ACTIONS.GO_TO_PREVIOUS_PAGE;
        return reqState;
    });
};
var goToPage = function (page, actionSrc) {
    if (actionSrc === void 0) { actionSrc = exports.ACTIONS.GO_TO_PAGE; }
    this.setRequestState(function (reqState) {
        reqState.page = page;
        reqState.action = actionSrc;
        return reqState;
    });
};
var canResetPagination = function () {
    var actionsToResetPagination = [
        filter_1.ACTIONS.APPLY_FILTER,
        filter_1.ACTIONS.CLEAR_FILTER,
        filter_1.ACTIONS.CLEAR_ALL_FILTERS,
        sortOption_1.ACTIONS.APPLY_SORT_OPTION
    ];
    return actionsToResetPagination.includes(this.requestState.action);
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getRequestHelpers = function () {
    var _a = this.paginationHelpers, goToNextPage = _a.goToNextPage, goToPreviousPage = _a.goToPreviousPage, goToPage = _a.goToPage, canResetPagination = _a.canResetPagination;
    return {
        canResetPagination: canResetPagination,
        goToNextPage: goToNextPage,
        goToPreviousPage: goToPreviousPage,
        goToPage: goToPage,
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
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    goToPage: goToPage,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers,
    canResetPagination: canResetPagination
};
//# sourceMappingURL=pagination.js.map