"use strict";
// ====== PUBLICLY EXPOSED HELPERS =======
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../shared/helpers/common");
var getFilters = function () {
    return this.responseState.filters;
};
var getAppliedFilters = function () {
    return getAppliedFilterItems(this.responseState.filters);
};
var applyFilter = function (filterId, filterItemsToApply) {
    this.setRequestState(function (reqState) {
        var filter = (reqState.filters[filterId] || []);
        if (Array.isArray(filterItemsToApply)) {
            filter = filter.concat(filterItemsToApply);
        }
        else {
            filter.push(filterItemsToApply);
        }
        reqState.filters[filterId] = filter;
        reqState.page = 1;
        return reqState;
    });
};
var getFilterById = function (filterId) {
    var flattenedFilterItems = flattenFilterItems(this.responseState.filters);
    var filter = flattenedFilterItems.find(function (filter) { return filter.id === filterId; });
    if (!filter)
        return false;
    return filter;
};
var getAppliedFilterById = function (filterId) {
    var appliedFilters = getAppliedFilters.call(this);
    var appliedFilter = appliedFilters.find(function (filter) { return filter.id === filterId; });
    if (!appliedFilter)
        return false;
    return appliedFilter;
};
var isFilterApplied = function (filterId) {
    var appliedFilter = getAppliedFilterById.call(this, filterId);
    if (appliedFilter)
        return true;
    return false;
};
var clearFilter = function (filterId, filterItemIds) {
    if (filterItemIds === void 0) { filterItemIds = []; }
    this.setRequestState(function (reqState) {
        if (filterItemIds.length === 0) {
            delete reqState.filters[filterId];
        }
        else {
            reqState.filters[filterId] = reqState.filters[filterId].filter(function (filterItemId) { return !filterItemIds.includes(filterItemId); });
        }
        reqState.page = 1;
        return reqState;
    });
};
var clearAllFilters = function () {
    this.setRequestState(function (reqState) {
        reqState.filters = {};
        reqState.page = 1;
        return reqState;
    });
};
// ==== UTILITY METHODS ====
var flattenFilterItems = function (items, flattenedItems) {
    if (flattenedItems === void 0) { flattenedItems = []; }
    items.forEach(function (item) {
        if (item.hasOwnProperty('items')) {
            flattenedItems.push((0, common_1.omit)(item, 'items'));
            flattenedItems.concat(flattenFilterItems(item.items, flattenedItems));
        }
        else {
            flattenedItems.push(item);
        }
    });
    return flattenedItems;
};
var getAppliedFilterItems = function (items) {
    var flattenedFilterItems = flattenFilterItems(items);
    var appliedFilterItems = flattenedFilterItems.filter(function (filter) { return filter.selected; });
    return appliedFilterItems;
};
var getResponseHelpers = function () {
    var _a = this.filterHelpers, getFilters = _a.getFilters, getAppliedFilters = _a.getAppliedFilters, getAppliedFilterById = _a.getAppliedFilterById, getFilterById = _a.getFilterById, isFilterApplied = _a.isFilterApplied;
    return {
        getFilters: getFilters,
        getAppliedFilterById: getAppliedFilterById,
        getAppliedFilters: getAppliedFilters,
        getFilterById: getFilterById,
        isFilterApplied: isFilterApplied
    };
};
var getRequestHelpers = function () {
    var _a = this.filterHelpers, applyFilter = _a.applyFilter, clearFilter = _a.clearFilter, clearAllFilters = _a.clearAllFilters;
    return {
        applyFilter: applyFilter,
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
    };
};
exports.default = {
    getFilters: getFilters,
    getAppliedFilters: getAppliedFilters,
    applyFilter: applyFilter,
    getFilterById: getFilterById,
    getAppliedFilterById: getAppliedFilterById,
    isFilterApplied: isFilterApplied,
    clearFilter: clearFilter,
    clearAllFilters: clearAllFilters,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=filter.js.map