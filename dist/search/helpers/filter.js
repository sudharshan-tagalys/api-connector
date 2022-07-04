"use strict";
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
var getFlattenedAppliedFilters = function () {
    var _this = this;
    var responseState = deepClone(this.responseState);
    var flattenedFilterItems = this.filterHelpers.flattenFilterItems(responseState.filters);
    var appliedFilterItems = flattenedFilterItems.filter(function (filter) {
        if (filter.hasOwnProperty('selected')) {
            return (filter.selected);
        }
        if (filter.type === 'range') {
            if (_this.requestState['filters']) {
                var selectedRangeFilter = _this.requestState['filters'][filter.id];
                if (selectedRangeFilter && filter.selected_min && filter.selected_max) {
                    return (selectedRangeFilter.selected_min !== filter.min || selectedRangeFilter.selected_max !== filter.max);
                }
            }
        }
    });
    return appliedFilterItems;
};
var getAppliedFilterItems = function (items) {
    return items.filter(function (item) {
        if (item.items)
            item.items = getAppliedFilterItems(item.items);
        return item.selected;
    });
};
var getAppliedFilters = function () {
    var responseState = deepClone(this.responseState);
    var appliedFilters = [];
    responseState.filters.map(function (filter) {
        if (filter.type === 'range') {
            if (filter.selected_min) {
                appliedFilters.push(filter);
            }
        }
        if (filter.items) {
            var appliedFilterItems = getAppliedFilterItems(filter.items);
            if (appliedFilterItems.length) {
                appliedFilters.push(__assign(__assign({}, filter), { items: appliedFilterItems }));
            }
        }
    });
    return appliedFilters;
};
var setFilter = function (filterId, appliedFilter, callAPI) {
    if (callAPI === void 0) { callAPI = false; }
    var filter = this.filterHelpers.getFilterById(filterId);
    this.setRequestState(function (reqState) {
        var filterItems = [];
        if (filter.type === "range") {
            filterItems = appliedFilter;
        }
        else {
            filterItems = (reqState.filters[filterId] || []);
            if (Array.isArray(appliedFilter)) {
                var updatedFilterItems = filterItems.concat(appliedFilter);
                var uniqueFilterItems = updatedFilterItems.filter(function (filterItem, index, arrayInstance) { return arrayInstance.indexOf(filterItem) === index; });
                filterItems = uniqueFilterItems;
            }
            else {
                if (!filterItems.includes(appliedFilter)) {
                    filterItems.push(appliedFilter);
                }
            }
        }
        reqState.filters[filterId] = filterItems;
        reqState.page = 1;
        return reqState;
    }, callAPI);
};
var applyFilter = function (filterId, appliedFilter) {
    this.filterHelpers.setFilter(filterId, appliedFilter, true);
};
var getFilterById = function (filterId) {
    var responseState = deepClone(this.responseState);
    var flattenedFilterItems = this.filterHelpers.flattenFilterItems(responseState.filters);
    var filter = flattenedFilterItems.find(function (filter) { return filter.id === filterId; });
    if (!filter)
        return false;
    return filter;
};
var getFilterItemById = function (filterItemId) {
    return this.filterHelpers.getFilterById(filterItemId);
};
var isFilterItemApplied = function (id) {
    var appliedFilters = this.filterHelpers.getFlattenedAppliedFilters();
    var appliedFilter = appliedFilters.find(function (filter) {
        if (filter.type === 'range') {
            return (filter.id === id);
        }
        if (filter.filterId) {
            return (filter.filterId === id);
        }
        return (filter.id === id);
    });
    if (appliedFilter)
        return true;
    return false;
};
var clearFilter = function (filterId, filterItemIds) {
    var _this = this;
    if (filterItemIds === void 0) { filterItemIds = []; }
    var responseState = deepClone(this.responseState);
    this.setRequestState(function (reqState) {
        if (Array.isArray(filterItemIds)) {
            if (filterItemIds.length === 0) {
                delete reqState.filters[filterId];
            }
            else {
                filterItemIds.forEach(function (filterItemId) {
                    if (reqState.filters[filterId]) {
                        var childFilterItemIds_1 = _this.filterHelpers.getChildFilterItemIds(responseState.filters, filterItemId);
                        var updatedFilterItemIds = reqState.filters[filterId].filter(function (filterItemId) { return !childFilterItemIds_1.includes(filterItemId); });
                        if (updatedFilterItemIds.length === 0) {
                            delete reqState.filters[filterId];
                        }
                        else {
                            reqState.filters[filterId] = updatedFilterItemIds;
                        }
                    }
                });
            }
        }
        else {
            _this.filterHelpers.clearFilter(filterId, [filterItemIds]);
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
var flattenFilterItems = function (items) {
    var children = [];
    var flattenItems = items.map(function (item) {
        if (item.items && item.items.length) {
            children = __spreadArray(__spreadArray([], children, true), item.items, true);
        }
        return item;
    });
    return flattenItems.concat(children.length ? this.filterHelpers.flattenFilterItems(children) : children);
};
var getPath = function (object, search) {
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
    var responseState = deepClone(this.responseState);
    var path = getPath(responseState.filters, filterItemId);
    if (path) {
        return path.filter(function (p) { return p !== filterItemId; });
    }
    return [];
};
var getFilterId = function (filterItemId) {
    var parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(filterItemId);
    return parentFilterItemIds[0];
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getResponseHelpers = function () {
    var _a = this.filterHelpers, getFilters = _a.getFilters, getFlattenedAppliedFilters = _a.getFlattenedAppliedFilters, getFilterById = _a.getFilterById, getFilterItemById = _a.getFilterItemById, isFilterItemApplied = _a.isFilterItemApplied, getAppliedFilters = _a.getAppliedFilters;
    return {
        getFilters: getFilters,
        getAppliedFilters: getAppliedFilters,
        getFlattenedAppliedFilters: getFlattenedAppliedFilters,
        getFilterById: getFilterById,
        getFilterItemById: getFilterItemById,
        isFilterItemApplied: isFilterItemApplied
    };
};
var getRequestHelpers = function () {
    var _a = this.filterHelpers, applyFilter = _a.applyFilter, setFilter = _a.setFilter, clearFilter = _a.clearFilter, clearAllFilters = _a.clearAllFilters;
    return {
        applyFilter: applyFilter,
        setFilter: setFilter,
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
    };
};
var deepClone = function (data) { return JSON.parse(JSON.stringify(data)); };
exports.default = {
    getFilters: getFilters,
    getFlattenedAppliedFilters: getFlattenedAppliedFilters,
    applyFilter: applyFilter,
    getFilterById: getFilterById,
    getFilterItemById: getFilterItemById,
    isFilterItemApplied: isFilterItemApplied,
    clearFilter: clearFilter,
    clearAllFilters: clearAllFilters,
    setFilter: setFilter,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers,
    getParentFilterItemIds: getParentFilterItemIds,
    getFilterId: getFilterId,
    flattenFilterItems: flattenFilterItems,
    getChildFilterItemIds: getChildFilterItemIds,
    getAppliedFilters: getAppliedFilters
};
//# sourceMappingURL=filter.js.map