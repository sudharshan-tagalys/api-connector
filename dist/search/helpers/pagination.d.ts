declare const _default: {
    goToNextPage: () => boolean;
    goToPrevPage: () => boolean;
    getCurrentPage: () => any;
    getTotalPages: () => any;
    hasNextPage: () => boolean;
    hasPreviousPage: () => boolean;
    goToPage: (page: any) => void;
    getRequestHelpers: () => {
        goToNextPage: any;
        goToPrevPage: any;
        goToPage: any;
    };
    getResponseHelpers: () => {
        getCurrentPage: any;
        getTotalPages: any;
        hasNextPage: any;
        hasPreviousPage: any;
    };
};
export default _default;
