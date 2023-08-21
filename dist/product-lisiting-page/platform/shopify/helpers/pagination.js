"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("../../../../lib/plp-base/helpers/filter");
var sortOption_1 = require("../../../../lib/plp-base/helpers/sortOption");
var ACTIONS = {
    GO_TO_NEXT_PAGE: 'GO_TO_NEXT_PAGE',
    GO_TO_PREVIOUS_PAGE: 'GO_TO_PREVIOUS_PAGE',
};
var hasNextPage = function () {
    return this.responseState.page_info.hasNextPage;
};
var getCurrentPage = function () {
    return this.responseState.page;
};
var hasPreviousPage = function () {
    return this.responseState.page_info.hasPreviousPage;
};
var goToNextPage = function (cursor) {
    var _this = this;
    if (!this.paginationHelpers.hasNextPage()) {
        console.error('Max pages reached');
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.action = ACTIONS.GO_TO_NEXT_PAGE;
        reqState.startCursor = null;
        reqState.endCursor = cursor ? cursor : _this.responseState.page_info.endCursor;
        return reqState;
    });
};
var goToPreviousPage = function (cursor) {
    var _this = this;
    if (cursor === void 0) { cursor = null; }
    if (!this.paginationHelpers.hasPreviousPage()) {
        console.error("Min pages reached");
        return false;
    }
    this.setRequestState(function (reqState) {
        reqState.action = ACTIONS.GO_TO_PREVIOUS_PAGE;
        reqState.startCursor = (cursor ? cursor : _this.responseState.page_info.startCursor);
        reqState.endCursor = null;
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
    var _a = this.paginationHelpers, goToNextPage = _a.goToNextPage, goToPreviousPage = _a.goToPreviousPage, canResetPagination = _a.canResetPagination;
    return {
        goToNextPage: goToNextPage,
        canResetPagination: canResetPagination,
        goToPreviousPage: goToPreviousPage,
    };
};
var getResponseHelpers = function () {
    var _a = this.paginationHelpers, hasNextPage = _a.hasNextPage, hasPreviousPage = _a.hasPreviousPage, getCurrentPage = _a.getCurrentPage;
    return {
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
        getCurrentPage: getCurrentPage
    };
};
exports.default = {
    goToNextPage: goToNextPage,
    goToPreviousPage: goToPreviousPage,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    getRequestHelpers: getRequestHelpers,
    canResetPagination: canResetPagination,
    getResponseHelpers: getResponseHelpers,
    getCurrentPage: getCurrentPage
};
//# sourceMappingURL=pagination.js.map