declare const _default: {
    getFilters: () => any;
    getFlattenedAppliedFilterItems: () => any;
    applyFilter: (filterId: any, appliedFilter: any) => void;
    getFilterById: (filterId: any) => any;
    getFilterItemById: (filterItemId: any) => any;
    isFilterItemApplied: (id: any) => boolean;
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
        getAppliedFilters: any;
        getFilterId: any;
        getFlattenedAppliedFilterItems: any;
        getFilterById: any;
        getFilterItemById: any;
        isFilterItemApplied: any;
    };
    getParentFilterItemIds: (filterItemId: any) => any;
    getFilterId: (filterItemId: any) => any;
    flattenFilterItems: (items: any) => any;
    getChildFilterItemIds: (filterItems: any, filterItemId: any) => any[];
    getAppliedFilters: () => any[];
};
export default _default;
