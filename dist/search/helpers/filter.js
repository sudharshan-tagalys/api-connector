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
    var appliedFilters = [];
    responseState.filters.map(function (filter) {
        if (filter.type === 'range') {
            if (_this.requestState['filters']) {
                var selectedRangeFilter = _this.requestState['filters'][filter.id];
                if (selectedRangeFilter && filter.selected_min && filter.selected_max) {
                    appliedFilters.push(filter);
                }
            }
        }
        else {
            var flattenedFilterItems = _this.filterHelpers.flattenFilterItems(filter.items);
            var selectedFilterItems = flattenedFilterItems.filter(function (filter) {
                if (filter.hasOwnProperty('selected')) {
                    return (filter.selected);
                }
            });
            if (selectedFilterItems.length > 0) {
                appliedFilters.push(__assign(__assign({}, filter), { items: selectedFilterItems }));
            }
        }
    });
    return appliedFilters;
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
    var _this = this;
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
        var parentIdsToRemove = [];
        filterItems.forEach(function (appliedFilterItemId) {
            var parentFilterItemIds = _this.filterHelpers.getParentFilterItemIds(filterId, appliedFilterItemId);
            parentIdsToRemove = parentIdsToRemove.concat(parentFilterItemIds);
        });
        reqState.filtersSelectionPreferences[filterId] = filterItems;
        reqState.filters[filterId] = filterItems.filter(function (appliedFilterItemId) { return !parentIdsToRemove.includes(appliedFilterItemId); });
        reqState.page = 1;
        return reqState;
    }, callAPI);
};
var applyFilter = function (filterId, appliedFilter) {
    this.filterHelpers.setFilter(filterId, appliedFilter, true);
};
var getFilterById = function (filterId) {
    var responseState = deepClone(this.responseState);
    var filter = responseState.filters.find(function (filter) { return filter.id === filterId; });
    if (!filter)
        return false;
    return filter;
};
var getFilterItemById = function (filterId, filterItemId) {
    var filter = this.filterHelpers.getFilterById(filterId);
    var filterItems = flattenFilterItems(filter.items);
    var filterItem = filterItems.find(function (filterItem) { return filterItem.id === filterItemId; });
    if (!filterItem)
        return false;
    return filterItem;
};
var isFilterApplied = function (filterId) {
    var appliedFilters = this.filterHelpers.getFlattenedAppliedFilters();
    var appliedFilter = appliedFilters.find(function (filter) { return filter.id === filterId; });
    if (appliedFilter)
        return true;
    return false;
};
var clearFilter = function (filterId, filterItemIds) {
    var _this = this;
    if (filterItemIds === void 0) { filterItemIds = []; }
    this.setRequestState(function (reqState) {
        if (Array.isArray(filterItemIds)) {
            if (filterItemIds.length === 0) {
                delete reqState.filters[filterId];
            }
            else {
                filterItemIds.forEach(function (filterItemId) {
                    if (reqState.filters[filterId]) {
                        var filter = _this.filterHelpers.getFilterById(filterId);
                        var childFilterItemIds_1 = _this.filterHelpers.getChildFilterItemIds(filter.items, filterItemId);
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
// ==== PUBLICLY EXPOSED HELPERS ====
var getResponseHelpers = function () {
    var _a = this.filterHelpers, getFilters = _a.getFilters, getFlattenedAppliedFilters = _a.getFlattenedAppliedFilters, getFilterById = _a.getFilterById, getFilterItemById = _a.getFilterItemById, isFilterApplied = _a.isFilterApplied, getAppliedFilters = _a.getAppliedFilters;
    return {
        getFilters: getFilters,
        getAppliedFilters: getAppliedFilters,
        getFlattenedAppliedFilters: getFlattenedAppliedFilters,
        getFilterById: getFilterById,
        getFilterItemById: getFilterItemById,
        isFilterApplied: isFilterApplied
    };
};
var getRequestHelpers = function () {
    var _a = this.filterHelpers, applyFilter = _a.applyFilter, clearFilter = _a.clearFilter, clearAllFilters = _a.clearAllFilters;
    return {
        applyFilter: applyFilter,
        setFilter: setFilter,
        clearFilter: clearFilter,
        clearAllFilters: clearAllFilters
    };
};
var getParentFilterItemIds = function (filterId, filterItemId) {
    var filter = this.filterHelpers.getFilterById(filterId);
    var path = getPath(filter.items, filterItemId);
    if (path) {
        return path.filter(function (p) { return p !== filterItemId; });
    }
    return [];
};
var deepClone = function (data) { return JSON.parse(JSON.stringify(data)); };
exports.default = {
    getFilters: getFilters,
    getFlattenedAppliedFilters: getFlattenedAppliedFilters,
    applyFilter: applyFilter,
    getFilterById: getFilterById,
    getFilterItemById: getFilterItemById,
    clearFilter: clearFilter,
    clearAllFilters: clearAllFilters,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers,
    flattenFilterItems: flattenFilterItems,
    getChildFilterItemIds: getChildFilterItemIds,
    getAppliedFilters: getAppliedFilters,
    isFilterApplied: isFilterApplied,
    setFilter: setFilter,
    getParentFilterItemIds: getParentFilterItemIds
};
//# sourceMappingURL=filter.js.map