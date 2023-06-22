declare const _default: {
    goToNextPage: () => boolean;
    goToPreviousPage: (action?: string) => boolean;
    getCurrentPage: () => any;
    getTotalPages: () => any;
    loadPreviousPage: () => void;
    hasNextPage: () => boolean;
    hasPreviousPage: () => boolean;
    goToPage: (page: any) => void;
    getRequestHelpers: () => {
        goToNextPage: any;
        goToPreviousPage: any;
        goToPage: any;
        loadPreviousPage: any;
    };
    getResponseHelpers: () => {
        getCurrentPage: any;
        getTotalPages: any;
        hasNextPage: any;
        hasPreviousPage: any;
    };
};
export default _default;
