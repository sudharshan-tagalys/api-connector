"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applySortOption = function (sortOptionId, sortDirection) {
    this.setRequestState(function (reqState) {
        reqState.sortField = sortOptionId;
        reqState.sortDirection = sortDirection;
        reqState.page = 1;
        return reqState;
    });
};
var getAppliedSortOption = function () {
    var sortOptions = this.sortOptionHelpers.getSortOptions();
    return sortOptions.find(function (sortOption) { return sortOption.selected === true; });
};
var getSortOptions = function () {
    return this.responseState.sort_options;
};
var getSortOptionById = function (sortOptionId) {
    var sortOptions = this.sortOptionHelpers.getSortOptions();
    return sortOptions.find(function (sortOption) { return sortOption.id === sortOptionId; });
};
var getRequestHelpers = function () {
    var applySortOption = this.sortOptionHelpers.applySortOption;
    return {
        applySortOption: applySortOption
    };
};
var getResponseHelpers = function () {
    var _a = this.sortOptionHelpers, getSortOptions = _a.getSortOptions, getSortOptionById = _a.getSortOptionById, getAppliedSortOption = _a.getAppliedSortOption;
    return {
        getSortOptions: getSortOptions,
        getSortOptionById: getSortOptionById,
        getAppliedSortOption: getAppliedSortOption
    };
};
exports.default = {
    applySortOption: applySortOption,
    getAppliedSortOption: getAppliedSortOption,
    getSortOptions: getSortOptions,
    getSortOptionById: getSortOptionById,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=sortOption.js.map