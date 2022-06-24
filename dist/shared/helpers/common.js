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
exports.getRequestParamsFromWindowLocation = exports.getRequestParamsFromQueryString = exports.getEncodedQueryString = exports.getURLEncodedQueryString = exports.flatten = exports.getPath = exports.omit = void 0;
var queryStringManager_1 = require("../../lib/queryStringManager");
var getURLEncodedQueryString = function (baseUrl, params) {
    return "".concat(baseUrl).concat(getEncodedQueryString(params));
};
exports.getURLEncodedQueryString = getURLEncodedQueryString;
var getEncodedQueryString = function (_a) {
    var _b = _a.query, query = _b === void 0 ? '' : _b, _c = _a.queryFilter, queryFilter = _c === void 0 ? {} : _c, _d = _a.filter, filter = _d === void 0 ? {} : _d, _e = _a.page, page = _e === void 0 ? null : _e, _f = _a.sort, sort = _f === void 0 ? null : _f;
    var _g = queryStringManager_1.default.getConfiguration(), queryReplacement = _g.query, queryFilterReplacement = _g.queryFilter, filterReplacement = _g.filter, pageReplacement = _g.page, sortReplacement = _g.sort;
    var params = {};
    if (query.length) {
        params[queryReplacement] = query;
    }
    var hasQueryFilters = (Object.keys(queryFilter).length !== 0);
    var hasFilters = (Object.keys(filter).length !== 0);
    if (hasQueryFilters) {
        params[queryFilterReplacement] = getFilterQueryString(queryFilter);
    }
    if (hasFilters) {
        params[filterReplacement] = getFilterQueryString(filter);
    }
    if (page) {
        params[pageReplacement] = page;
    }
    if (sort) {
        if (sort.field) {
            if (sort.direction) {
                params[sortReplacement] = "".concat(sort.field, "-").concat(sort.direction);
            }
            else {
                params[sortReplacement] = sort.field;
            }
        }
    }
    return "?".concat(queryStringManager_1.default.stringify(params));
};
exports.getEncodedQueryString = getEncodedQueryString;
var getRequestParamsFromWindowLocation = function () {
    return getRequestParamsFromQueryString(window.location.search.replace("?", ''));
};
exports.getRequestParamsFromWindowLocation = getRequestParamsFromWindowLocation;
var getRequestParamsFromQueryString = function (queryString) {
    var parsedObjectFromQueryString = queryStringManager_1.default.parse(queryString);
    var _a = queryStringManager_1.default.getConfiguration(), query = _a.query, queryFilter = _a.queryFilter, filter = _a.filter, page = _a.page, sort = _a.sort;
    var params = {};
    if (parsedObjectFromQueryString[query]) {
        params['query'] = parsedObjectFromQueryString[query];
    }
    if (parsedObjectFromQueryString[queryFilter]) {
        params['queryFilter'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilter]);
    }
    if (parsedObjectFromQueryString[filter]) {
        params['filter'] = getFiltersFromQueryString(parsedObjectFromQueryString[filter]);
    }
    if (parsedObjectFromQueryString[page]) {
        params['page'] = parseInt(parsedObjectFromQueryString[page].toString());
    }
    if (parsedObjectFromQueryString[sort]) {
        params['sort'] = parsedObjectFromQueryString[sort];
    }
    return params;
};
exports.getRequestParamsFromQueryString = getRequestParamsFromQueryString;
var getFilterQueryString = function (filter) {
    return Object.keys(filter).map(function (key) {
        return "".concat(key, "-").concat(filter[key]);
    }).join('~');
};
var getFiltersFromQueryString = function (filterQueryString) {
    var filtersFromQueryString = filterQueryString.split("~");
    var filters = {};
    filtersFromQueryString.forEach(function (filterFromQueryString) {
        var filter = filterFromQueryString.split('-');
        var filterKey = filter[0];
        var filterValueString = filter[1];
        var appliedFilterValues = filterValueString.split(',');
        filters[filterKey] = appliedFilterValues;
    });
    return filters;
};
var omit = function (obj, omitKey) {
    return Object.keys(obj).reduce(function (result, key) {
        if (key !== omitKey) {
            result[key] = obj[key];
        }
        return result;
    }, {});
};
exports.omit = omit;
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
exports.getPath = getPath;
var flatten = function (members, level, rootParentId) {
    if (level === void 0) { level = 1; }
    if (rootParentId === void 0) { rootParentId = null; }
    var children = [];
    var flattenMembers = members.map(function (m) {
        if (level === 1) {
            rootParentId = m.id;
        }
        if (m.items && m.items.length) {
            level += 1;
            m.items = m.items.map(function (item) {
                return __assign(__assign({}, item), { parentId: m.id, rootParentId: rootParentId });
            });
            children = __spreadArray(__spreadArray([], children, true), m.items, true);
        }
        return m;
    });
    return flattenMembers.concat(children.length ? flatten(children, level, rootParentId) : children);
};
exports.flatten = flatten;
//# sourceMappingURL=common.js.map