declare const _default: {
    getFilters: () => any;
    getAppliedFilters: () => any[];
    applyFilter: (filterId: any, filterItemsToApply: any) => void;
    getFilterById: (filterId: any) => any;
    getAppliedFilterById: (filterId: any) => any;
    isFilterApplied: (filterId: any) => boolean;
    clearFilter: (filterId: any, filterItemIds?: any[]) => void;
    clearAllFilters: () => void;
    getRequestHelpers: () => {
        applyFilter: any;
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
};
export default _default;
