export declare const ACTIONS: {
    GO_TO_NEXT_PAGE: string;
    GO_TO_PREVIOUS_PAGE: string;
    GO_TO_PAGE: string;
};
declare const _default: {
    goToNextPage: () => boolean;
    goToPreviousPage: () => boolean;
    getCurrentPage: () => any;
    getTotalPages: () => any;
    hasNextPage: () => boolean;
    hasPreviousPage: () => boolean;
    goToPage: (page: any, actionSrc?: string) => void;
    getRequestHelpers: () => {
        canResetPagination: any;
        goToNextPage: any;
        goToPreviousPage: any;
        goToPage: any;
    };
    getResponseHelpers: () => {
        getCurrentPage: any;
        getTotalPages: any;
        hasNextPage: any;
        hasPreviousPage: any;
    };
    canResetPagination: () => boolean;
};
export default _default;
