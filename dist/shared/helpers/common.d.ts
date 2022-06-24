declare const getURLEncodedQueryString: (baseUrl: any, params: any) => string;
declare const getEncodedQueryString: ({ query, queryFilter, filter, page, sort }: {
    query?: string;
    queryFilter?: {};
    filter?: {};
    page?: any;
    sort?: any;
}) => string;
declare const getRequestParamsFromWindowLocation: () => {};
declare const getRequestParamsFromQueryString: (queryString: any) => {};
export { getURLEncodedQueryString, getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation };
