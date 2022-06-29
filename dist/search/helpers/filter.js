"use strict";
// ====== PUBLICLY EXPOSED HELPERS =======
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var getFilters = function () {
    return this.responseState.filters;
};
var getAppliedFilters = function () {
    var _this = this;
    var flattenedFilterItems = this.filterHelpers.flattenFilterItems(this.responseState.filters);
    var appliedFilterItems = flattenedFilterItems.filter(function (filter) {
        if (filter.type === 'checkbox') {
            return filter.selected;
        }
        if (filter.type === 'range') {
            if (_this.requestState['filters']) {
                var selectedRangeFilter = _this.requestState['filters'][filter.id];
                if (selectedRangeFilter) {
                    return (selectedRangeFilter.selected_min !== filter.min || selectedRangeFilter.selected_max !== filter.max);
                }
            }
        }
    });
    return appliedFilterItems;
};
var applyFilter = function (filterId, filterType, filterItemsToApply) {
    this.setRequestState(function (reqState) {
        var filter = [];
        if (filterType === "range") {
            filter = filterItemsToApply;
        }
        else {
            filter = (reqState.filters[filterId] || []);
            if (Array.isArray(filterItemsToApply)) {
                // filter out the exisiting items
                filter = filter.concat(filterItemsToApply);
            }
            else {
                if (!filter.includes(filterItemsToApply)) {
                    filter.push(filterItemsToApply);
                }
            }
        }
        reqState.filters[filterId] = filter;
        reqState.page = 1;
        return reqState;
    });
};
var getFilterById = function (filterId) {
    var flattenedFilterItems = this.filterHelpers.flattenFilterItems(this.responseState.filters);
    var filter = flattenedFilterItems.find(function (filter) { return filter.id === filterId; });
    if (!filter)
        return false;
    return filter;
};
var getAppliedFilterById = function (filterId) {
    var appliedFilters = this.filterHelpers.getAppliedFilters();
    var appliedFilter = appliedFilters.find(function (filter) { return filter.id === filterId; });
    if (!appliedFilter)
        return false;
    return appliedFilter;
};
var isFilterApplied = function (filterId) {
    var appliedFilters = this.filterHelpers.getAppliedFilters();
    var appliedFilter = appliedFilters.find(function (filter) { return filter.filterId === filterId; });
    if (appliedFilter)
        return true;
    return false;
};
var clearFilter = function (filterId, filterItemIds) {
    var _this = this;
    if (filterItemIds === void 0) { filterItemIds = []; }
    this.setRequestState(function (reqState) {
        if (filterItemIds.length === 0) {
            delete reqState.filters[filterId];
        }
        else {
            filterItemIds.forEach(function (filterItemId) {
                var childFilterItemIds = _this.filterHelpers.getChildFilterItemIds(_this.responseState.filters, filterItemId);
                var updatedFilterItemIds = reqState.filters[filterId].filter(function (filterItemId) { return !childFilterItemIds.includes(filterItemId); });
                if (updatedFilterItemIds.length === 0) {
                    delete reqState.filters[filterId];
                }
                else {
                    reqState.filters[filterId] = updatedFilterItemIds;
                }
            });
        }
        reqState.page = 1;
        return reqState;
    });
};
var getChildFilterItemIds = function (filterItems, filterItemId) {
    var _this = this;
    var childFilterIds = [];
    filterItems.forEach(function (item) {
        if (item.id === filterItemId) {
            var flattenedFilterItems = _this.filterHelpers.flattenFilterItems([item]);
            childFilterIds = flattenedFilterItems.map(function (filterItem) { return filterItem.id; });
        }
        if (item.hasOwnProperty('items')) {
            childFilterIds = childFilterIds.concat(_this.filterHelpers.getChildFilterItemIds(item.items, filterItemId));
        }
    });
    return childFilterIds;
};
var getParentFilterItemIds = function (filterItemId) {
    var path = getPath(this.responseState.filters, filterItemId);
    if (path) {
        return path.filter(function (p) { return p !== filterItemId; });
    }
    return [];
};
var getFilterId = function (filterItemId) {
    var parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(filterItemId);
    return parentFilterItemIds[0];
};
var clearAllFilters = function () {
    this.setRequestState(function (reqState) {
        reqState.filters = {};
        reqState.page = 1;
        return reqState;
    });
};
// ==== UTILITY METHODS ====
var flattenFilterItems = function (items) {
    var _this = this;
    var children = [];
    var flattenItems = items.map(function (item) {
        if (item.items && item.items.length) {
            item.items = item.items.map(function (item) {
                return __assign(__assign({}, item), { filterId: _this.filterHelpers.getFilterId(item.id) });
            });
            children = __spreadArray(__spreadArray([], children, true), item.items, true);
        }
        return item;
    });
    return flattenItems.concat(children.length ? this.filterHelpers.flattenFilterItems(children) : children);
};
function getPath(object, search) {
    if (object.id === search)
        return [object.id];
    else if ((object.items) || Array.isArray(object)) {
        var children = Array.isArray(object) ? object : object.items;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            var result = getPath(child, search);
            if (result) {
                if (object.id)
                    result.unshift(object.id);
                return result;
            }
        }
    }
}
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
    getResponseHelpers: getResponseHelpers,
    getParentFilterItemIds: getParentFilterItemIds,
    getFilterId: getFilterId,
    flattenFilterItems: flattenFilterItems,
    getChildFilterItemIds: getChildFilterItemIds
};
//# sourceMappingURL=filter.js.map