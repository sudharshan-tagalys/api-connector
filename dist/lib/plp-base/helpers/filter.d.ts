export declare const ACTIONS: {
    APPLY_FILTER: string;
    CLEAR_FILTER: string;
    CLEAR_ALL_FILTERS: string;
};
declare const _default: {
    getFilters: () => any;
    getFlattenedAppliedFilters: () => any[];
    applyFilter: (filterId: any, appliedFilter: any) => void;
    getFilterById: (filterId: any) => any;
    getFilterItemById: (filterId: any, filterItemId: any) => any;
    clearFilter: (filterId: any, filterItemIds?: any[], callAPI?: boolean) => void;
    clearAllFilters: () => void;
    getRequestHelpers: () => {
        applyFilter: any;
        setFilter: (filterId: any, appliedFilter: any, callAPI?: boolean) => void;
        clearFilter: any;
        clearAllFilters: any;
        hasAnyFiltersApplied: any;
    };
    getResponseHelpers: () => {
        getFilters: any;
        getAppliedFilters: any;
        getFilterById: any;
        getFilterItemById: any;
        isFilterApplied: any;
    };
    flattenFilterItems: (items: any) => any;
    getChildFilterItemIds: (filterItems: any, filterItemId: any) => any[];
    getAppliedFilters: (flatten?: boolean) => any;
    isFilterApplied: (filterId: any) => boolean;
    setFilter: (filterId: any, appliedFilter: any, callAPI?: boolean) => void;
    getParentFilterItemIds: (filterId: any, filterItemId: any) => any;
    hasAnyFiltersApplied: () => boolean;
};
export default _default;
