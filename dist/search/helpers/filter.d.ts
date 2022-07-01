declare const _default: {
    getFilters: () => any;
    getAppliedFilters: () => any;
    applyFilter: (filterId: any, appliedFilter: any) => void;
    getFilterById: (filterId: any) => any;
    getAppliedFilterById: (filterId: any) => any;
    isFilterApplied: (id: any) => boolean;
    clearFilter: (filterId: any, filterItemIds?: any[]) => void;
    clearAllFilters: () => void;
    setFilter: (filterId: any, appliedFilter: any, callAPI?: boolean) => void;
    getRequestHelpers: () => {
        applyFilter: any;
        setFilter: any;
        clearFilter: any;
        clearAllFilters: any;
    };
    getResponseHelpers: () => {
        getFilters: any;
        getAppliedFilterById: any;
        getAppliedFilters: any;
        getFilterById: any;
        isFilterApplied: any;
    };
    getParentFilterItemIds: (filterItemId: any) => any;
    getFilterId: (filterItemId: any) => any;
    flattenFilterItems: (items: any) => any;
    getChildFilterItemIds: (filterItems: any, filterItemId: any) => any[];
};
export default _default;
