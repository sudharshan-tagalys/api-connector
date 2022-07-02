declare const getURLEncodedQueryString: (baseUrl: any, params: any) => string;
declare const getEncodedQueryString: ({ query, queryFilter, filter, page, sort, except }: {
    query?: string;
    queryFilter?: {};
    filter?: {};
    page?: any;
    sort?: any;
    except?: any[];
}) => string;
declare const getRequestParamsFromWindowLocation: () => {};
declare const getRequestParamsFromQueryString: (queryString: any) => {};
declare const caseInsensitiveString: (string: any) => any;
declare const sortRecentSeaches: (arr: any) => any;
declare const addToRecentSearch: (queryString: any) => void;
declare const removeRecentSearch: (displayString: string) => void;
declare const formatSearchItem: (searchItem: any) => {
    displayString: any;
    queryString: any;
};
export { getURLEncodedQueryString, getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation, addToRecentSearch, removeRecentSearch, caseInsensitiveString, formatSearchItem, sortRecentSeaches };
