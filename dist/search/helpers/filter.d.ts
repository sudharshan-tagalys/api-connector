declare const _default: {
    getFilters: () => any;
    getFlattenedAppliedFilters: () => any[];
    applyFilter: (filterId: any, appliedFilter: any) => void;
    getFilterById: (filterId: any) => any;
    getFilterItemById: (filterId: any, filterItemId: any) => any;
    clearFilter: (filterId: any, filterItemIds?: any[]) => void;
    clearAllFilters: () => void;
    getRequestHelpers: () => {
        applyFilter: any;
        setFilter: (filterId: any, appliedFilter: any, callAPI?: boolean) => void;
        clearFilter: any;
        clearAllFilters: any;
    };
    getResponseHelpers: () => {
        getFilters: any;
        getAppliedFilters: any;
        getFlattenedAppliedFilters: any;
        getFilterById: any;
        getFilterItemById: any;
        isFilterApplied: any;
    };
    flattenFilterItems: (items: any) => any;
    getChildFilterItemIds: (filterItems: any, filterItemId: any) => any[];
    getAppliedFilters: () => any[];
    isFilterApplied: (filterId: any) => boolean;
    setFilter: (filterId: any, appliedFilter: any, callAPI?: boolean) => void;
    getParentFilterItemIds: (filterId: any, filterItemId: any) => any;
};
export default _default;
