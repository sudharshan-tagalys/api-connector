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
    return getAppliedFilterItems(this.responseState.filters);
};
var applyFilter = function (filterId, filterItemsToApply) {
    this.setRequestState(function (reqState) {
        var filter = (reqState.filters[filterId] || []);
        if (Array.isArray(filterItemsToApply)) {
            // filter out the exisiting items
            filter = filter.concat(filterItemsToApply);
        }
        else {
            if (!filter.includes(filterItemsToApply)) {
                filter.push(filterItemsToApply);
            }
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
    var _this = this;
    if (filterItemIds === void 0) { filterItemIds = []; }
    this.setRequestState(function (reqState) {
        if (filterItemIds.length === 0) {
            delete reqState.filters[filterId];
        }
        else {
            filterItemIds.forEach(function (filterItemId) {
                var childFilterItemIds = getChildFilterItemIds(_this.responseState.filters, filterItemId);
                console.log("CHILD", childFilterItemIds);
                reqState.filters[filterId] = reqState.filters[filterId].filter(function (filterItemId) { return !childFilterItemIds.includes(filterItemId); });
            });
        }
        reqState.page = 1;
        return reqState;
    });
};
var getChildFilterItemIds = function (filterItems, filterItemId) {
    var childFilterIds = [];
    filterItems.forEach(function (item) {
        if (item.id === filterItemId) {
            var flattenedFilterItems = flattenFilterItems([item]);
            childFilterIds = flattenedFilterItems.map(function (filterItem) { return filterItem.id; });
        }
        if (item.hasOwnProperty('items')) {
            childFilterIds = childFilterIds.concat(getChildFilterItemIds(item.items, filterItemId));
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
var clearAllFilters = function () {
    this.setRequestState(function (reqState) {
        reqState.filters = {};
        reqState.page = 1;
        return reqState;
    });
};
// ==== UTILITY METHODS ====
var getAppliedFilterItems = function (items) {
    var flattenedFilterItems = flattenFilterItems(items, true);
    var appliedFilterItems = flattenedFilterItems.filter(function (filter) { return filter.selected; });
    return appliedFilterItems;
};
var flattenFilterItems = function (members, includeFilterId, level, filterId) {
    if (includeFilterId === void 0) { includeFilterId = false; }
    if (level === void 0) { level = 1; }
    if (filterId === void 0) { filterId = null; }
    var children = [];
    var flattenMembers = members.map(function (m) {
        if (level === 1) {
            filterId = m.id;
        }
        if (m.items && m.items.length) {
            level += 1;
            if (includeFilterId) {
                m.items = m.items.map(function (item) {
                    return __assign(__assign({}, item), { filterId: filterId });
                });
            }
            children = __spreadArray(__spreadArray([], children, true), m.items, true);
        }
        return m;
    });
    return flattenMembers.concat(children.length ? flattenFilterItems(children, includeFilterId, level, filterId) : children);
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
    getParentFilterItemIds: getParentFilterItemIds
};
//# sourceMappingURL=filter.js.map