declare const _default: {
    goToNextPage: (cursor: any) => boolean;
    goToPreviousPage: (cursor?: any) => boolean;
    hasNextPage: () => any;
    hasPreviousPage: () => any;
    getRequestHelpers: () => {
        goToNextPage: any;
        canResetPagination: any;
        goToPreviousPage: any;
    };
    canResetPagination: () => boolean;
    getResponseHelpers: () => {
        hasNextPage: any;
        hasPreviousPage: any;
        getCurrentPage: any;
    };
    getCurrentPage: () => any;
};
export default _default;
